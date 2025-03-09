import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  if (!req.headers['authorization']) {
    return res.status(401).json({ message: 'Missed token' });
  }

  const token = String(req.headers['authorization']).split(' ')[1];

  try {
    jwt.verify(token, process.env.JWT_ACCESS_SECRET);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }

  next();
};
