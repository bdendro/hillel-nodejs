import fs from 'node:fs';
import path from 'node:path';
import levels from './levels.js';
import formatMessage from './formatter.js';
import getErrorInfo from './getErrorInfo.js';
import { ENV_LOCAL } from '../env.js';

class Logger {
  constructor(logPath = 'logs/app.log') {
    this.logPath = path.normalize(logPath);

    if (!fs.existsSync(path.dirname(this.logPath))) {
      fs.mkdirSync(path.dirname(this.logPath), { recursive: true });
    }
  }

  __log(level, msg) {
    let message;

    if (msg instanceof Error) {
      message = `${msg.name}, ${msg.message}`;
      const addErrInfo = getErrorInfo(msg);
      if (addErrInfo) {
        message += `, ${addErrInfo}`;
      }
    } else {
      message = msg;
    }

    const formattedMsg = formatMessage(level, message);

    if (process.env.APP_ENV === ENV_LOCAL) {
      console.log(formattedMsg);
    } else {
      fs.appendFile(this.logPath, `${formattedMsg} \n`, (err) => {
        if (err) {
          console.error('Error while try to put data into file', err.message);
        }
      });
    }
  }

  info(msg) {
    this.__log(levels.INFO, msg);
  }

  warning(msg) {
    this.__log(levels.WARNING, msg);
  }

  error(msg) {
    this.__log(levels.ERROR, msg);
  }
}

export default Logger;
