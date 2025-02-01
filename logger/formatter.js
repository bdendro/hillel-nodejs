import chalk from 'chalk';
import levels from './levels.js';

function formatMessage(level, msg) {
  const timestamp = new Date().toISOString();

  switch (level) {
    case levels.INFO:
      return chalk.blue(`[${timestamp}], INFO: ${msg}`);
    case levels.WARNING:
      return chalk.yellow(`[${timestamp}], WARNING: ${msg}`);
    case levels.ERROR:
      return chalk.red(`[${timestamp}], ERROR: ${msg}`);
    default:
      return chalk.grey(`[${timestamp}], UNKNOWN: ${msg}`);
  }
}

export default formatMessage;
