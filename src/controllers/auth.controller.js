import jwt from 'jsonwebtoken';
import {
  getUserByEmail,
  getUser as getUserService,
  postUser as postUserService,
  verifyUser,
} from '../services/user.service.js';

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

export const signUp = (req, res) => {
  const user = req.body;

  const resUser = postUserService(user);
  if (!resUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const refreshToken = getRefreshToken(resUser);
  const accessToken = getAccessToken(resUser);

  res.status(201).json({ accessToken, refreshToken });
};

export const signIn = (req, res) => {
  const { email, password } = req.body;
  const user = getUserByEmail(email);

  if (!verifyUser(user, password)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const refreshToken = getRefreshToken(user);
  const accessToken = getAccessToken(user);

  res.status(201).json({ accessToken, refreshToken });
};

export const refreshToken = (req, res) => {
  const { token: refreshToken } = req.body;

  let payload;
  try {
    payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }

  const user = getUserService(payload.userId);
  if (!user) {
    return res.status(403).json({ message: 'User not found or access denied' });
  }

  const accessToken = getAccessToken(user);

  return res.status(201).json({ accessToken, refreshToken });
};
