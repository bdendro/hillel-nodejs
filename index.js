import Logger from './logger/logger.js';

const logger = new Logger();

logger.info('Info message 1');
logger.warning('Warning message 1');
logger.error('Error message 1');

console.log({ APP_ENV: process.env.APP_ENV, pid: process.pid });

const err = new Error('error message');
logger.error(err);

logger.info('Info message 2', false);
logger.warning('Warning message 2', false);
logger.error('Error message 2', false);

console.log('Some text');
