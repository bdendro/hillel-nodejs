import chalk from 'chalk';

function formatMessage(level, msg) {
  const timestamp = new Date().toISOString();

  switch (level) {
    case 'info':
      return chalk.blue(`[${timestamp}], INFO: ${msg}`);
    case 'warning':
      return chalk.yellow(`[${timestamp}], WARNING: ${msg}`);
    case 'error':
      return chalk.red(`[${timestamp}], ERROR: ${msg}`);
      default: 
      return chalk.grey(`[${timestamp}], UNKNOWN: ${msg}`)
  }
}

export default formatMessage;
