import crypto from 'node:crypto';
import User from '../models/user.model.js';

const getHashedPassword = (password) => {
  return crypto.createHash('md5').update(password).digest().toString('hex');
};

export const verifyUser = (user, password) => {
  if (!user) {
    return false;
  }
  return getHashedPassword(password) === user.password;
};

export const getUsers = async () => {
  const users = await User.findAll({ order: [['id', 'ASC']] });
  return users;
};

export const getUser = async (id) => {
  const user = await User.findByPk(parseInt(id));
  return user;
};

export const getUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

export const postUser = async (user) => {
  user.password = getHashedPassword(user.password);
  const newUser = await User.create(user);
  return newUser;
};

export const putUser = async (id, user) => {
  user.password = getHashedPassword(user.password);
  const [affectedRows, updatedUsers] = await User.update(user, {
    where: { id: parseInt(id) },
    returning: true,
  });
  if (!affectedRows) {
    return null;
  }
  return updatedUsers[0];
};

export const deleteUser = async (id) => {
  const res = await User.destroy({ where: { id: parseInt(id) } });
  if (!res) {
    return true;
  }
  return true;
};
