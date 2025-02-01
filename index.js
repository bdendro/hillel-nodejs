import Logger from './logger/logger.js';
import sleep from './utils/sleep.js';

const logger = new Logger();

logger.info('Info message');
logger.warning('Warning message');
logger.error('Error message');

console.log({ APP_ENV: process.env.APP_ENV, pid: process.pid });

await sleep(5_000);

const err = new Error('error message');
logger.error(err);

Error.captureStackTrace(err);
logger.error(err);
