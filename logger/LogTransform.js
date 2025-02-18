import chalk from 'chalk';
import levels from './levels.js';
import { Transform } from 'node:stream';
import { ENV_LOCAL } from '../env.js';

class LogTransform extends Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform({ level, msg }, enc, callback) {
    const timestamp = new Date().toISOString();
    let formattedMsg = `[${timestamp}] ${level.toUpperCase()}: ${msg}`;

    switch (level) {
      case levels.INFO:
        formattedMsg = chalk.blue(formattedMsg);
        break;
      case levels.WARNING:
        formattedMsg = chalk.yellow(formattedMsg);
        break;
      case levels.ERROR:
        formattedMsg = chalk.red(formattedMsg);
        break;
      default:
        formattedMsg = chalk.grey(formattedMsg);
    }

    if (process.env.APP_ENV === ENV_LOCAL) {
      this.push(`${formattedMsg}`);
    } else {
      this.push(`${formattedMsg}\n`);
    }

    callback();
  }
}

export default LogTransform;
