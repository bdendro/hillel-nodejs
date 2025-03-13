import { Sequelize } from 'sequelize';
import Logger from '../utils/logger/Logger.js';

const logger = new Logger();

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOSTNAME,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false,
});

try {
  await sequelize.authenticate();
  logger.info('Connection has been established successfully.', false);
} catch (error) {
  const newError = new Error(`Database connection failed: ${error?.message}`);
  newError.name = error.name;
  logger.error(newError, false);
}

export default sequelize;
