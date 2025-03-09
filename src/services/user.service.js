import crypto from 'node:crypto';

const users = [];
let i = 1; // autoincrement

const findById = (id) => {
  return users.find((user) => user.id === parseInt(id));
};

const findIndexById = (id) => {
  return users.findIndex((user) => user.id === parseInt(id));
};

const getHashedPassword = (password) => {
  return crypto.createHash('md5').update(password).digest().toString('hex');
};

export const verifyUser = (user, password) => {
  if (!user) {
    return false;
  }
  return getHashedPassword(password) === user.password;
};

export const getUsers = () => {
  return users;
};

export const getUser = (id) => {
  const user = findById(id);
  if (!user) {
    return null;
  }
  return user;
};

export const getUserByEmail = (email) => {
  return users.find((user) => user.email === email);
};

export const postUser = (user) => {
  const userByEmail = getUserByEmail(user.email);
  if (userByEmail) {
    return null;
  }
  user.password = getHashedPassword(user.password);
  users.push({ id: i, ...user });
  i++;
  return findById(i - 1);
};

export const putUser = (id, user) => {
  const userIndex = findIndexById(id);
  if (userIndex === -1) {
    return null;
  }
  user.password = getHashedPassword(user.password);
  users[userIndex] = { id: parseInt(id), ...user };
  return users[userIndex];
};

export const deleteUser = (id) => {
  const userIndex = findIndexById(id);
  if (userIndex === -1) {
    return null;
  }
  users.splice(userIndex, 1);
  return true;
};
