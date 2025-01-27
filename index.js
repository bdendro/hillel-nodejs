import Logger from './logger/logger.js';

const logger = new Logger();

logger.info('Info message');
logger.warning('Warning message');
logger.error('Error message');

console.log({ APP_ENV: process.env.APP_ENV, pid: process.pid });

const err = new Error('error message');
logger.error(err);
