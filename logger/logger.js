import fs from 'node:fs';
import path from 'node:path';
import levels from './levels.js';
import formatMessage from './formatter.js';
import getErrorInfo from './getErrorInfo.js';
import { ENV_LOCAL } from '../env.js';
import { EventEmitter } from 'node:events';
import { EVENT_LOG, EVENT_LOG_AS } from '../events.js';

class Logger {
  constructor(logPath = 'logs/app.log') {
    this.logPath = path.normalize(logPath);

    if (!fs.existsSync(path.dirname(this.logPath))) {
      fs.mkdirSync(path.dirname(this.logPath), { recursive: true });
    }

    this.__emmiter = new EventEmitter();
    this.__emmiter.on(EVENT_LOG, (...args) => {
      this.__writeMsg(...args);
    });

    this.__emmiter.on(EVENT_LOG_AS, (...args) => {
      setImmediate(() => {
        this.__writeMsg(...args);
      });
    });
  }

  __writeMsg(msg) {
    if (process.env.APP_ENV === ENV_LOCAL) {
      console.log(msg);
    } else {
      fs.appendFile(this.logPath, `${msg} \n`, (err) => {
        if (err) {
          console.error('Error while try to put data into file', err.message);
        }
      });
    }
  }

  __log(level, msg, async) {
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

    if (async) {
      this.__emmiter.emit(EVENT_LOG_AS, formattedMsg);
    } else {
      this.__emmiter.emit(EVENT_LOG, formattedMsg);
    }
  }

  info(msg, async = true) {
    this.__log(levels.INFO, msg, async);
  }

  warning(msg, async = true) {
    this.__log(levels.WARNING, msg, async);
  }

  error(msg, async = true) {
    this.__log(levels.ERROR, msg, async);
  }
}

export default Logger;
