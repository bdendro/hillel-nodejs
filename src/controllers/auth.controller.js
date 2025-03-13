import jwt from 'jsonwebtoken';
import {
  getUserByEmail,
  getUser as getUserService,
  postUser as postUserService,
  verifyUser,
} from '../services/user.service.js';
import Logger from '../utils/logger/Logger.js';

const logger = new Logger();

const getAccessToken = (user) => {
  const accessToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_LIFETIME }
  );

  return accessToken;
};

const getRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_LIFETIME }
  );

  return refreshToken;
};

export const signUp = async (req, res) => {
  const user = req.body;
  try {
    const resUser = await postUserService(user);
    if (!resUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const refreshToken = getRefreshToken(resUser);
    const accessToken = getAccessToken(resUser);

    res.status(201).json({ accessToken, refreshToken });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ msg: 'User already exists' });
    }

    logger.error(err);
    if (err.name === 'SequelizeConnectionError') {
      return res.status(503).json({ message: 'Database connection error' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);

    if (!verifyUser(user, password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const refreshToken = getRefreshToken(user);
    const accessToken = getAccessToken(user);

    res.status(201).json({ accessToken, refreshToken });
  } catch (err) {
    logger.error(err);
    if (err.name === 'SequelizeConnectionError') {
      return res.status(503).json({ message: 'Database connection error' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const refreshToken = async (req, res) => {
  const { token: refreshToken } = req.body;

  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
  try {
    const user = await getUserService(payload.userId);
    if (!user) {
      return res
        .status(403)
        .json({ message: 'User not found or access denied' });
    }
    const accessToken = getAccessToken(user);

    return res.status(201).json({ accessToken, refreshToken });
  } catch (err) {
    logger.error(err);
    if (err.name === 'SequelizeConnectionError') {
      return res.status(503).json({ message: 'Database connection error' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
};
