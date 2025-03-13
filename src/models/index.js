import Logger from '../utils/logger/Logger.js';
import sequelize from './db.js';
import User from './user.model.js';
import Todo from './todo.model.js';

const logger = new Logger();

const models = { User, Todo };

Object.values(models).forEach((model) => {
  if (model.associate) {
    model.associate(models);
  }
});

try {
  await sequelize.sync({ alter: true });
  logger.info('Database synchronized successfully.', false);
} catch (error) {
  const newError = new Error(
    `Database synchronization failed: ${error?.message}`
  );
  newError.name = error.name;
  logger.error(newError, false);
}
