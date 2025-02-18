import fs from 'node:fs';
import path from 'node:path';
import levels from './levels.js';
import getErrorInfo from './getErrorInfo.js';
import { ENV_LOCAL } from '../env.js';
import { EventEmitter } from 'node:events';
import { EVENT_LOG, EVENT_LOG_AS } from '../events.js';
import LogTransform from './LogTransform.js';

class Logger {
  constructor(logPath = 'logs/app.log') {
    this.logPath = path.normalize(logPath);
    this.__emitter = new EventEmitter();
    this.__logTransform = new LogTransform();
    this.__logWrite = fs.createWriteStream(this.logPath, { flags: 'a' });

    if (!fs.existsSync(path.dirname(this.logPath))) {
      fs.mkdirSync(path.dirname(this.logPath), { recursive: true });
    }

    this.__emitter.on(EVENT_LOG, (level, msg) => {
      this.__writeMsg(level, msg);
    });

    this.__emitter.on(EVENT_LOG_AS, (level, msg) => {
      setImmediate(() => {
        this.__writeMsg(level, msg);
      });
    });

    if (process.env.APP_ENV === ENV_LOCAL) {
      this.__logTransform.on('data', (chunk) => {
        console.log(chunk);
      });
    } else {
      this.__logTransform.pipe(this.__logWrite);
    }
  }

  __writeMsg(level, msg) {
    this.__logTransform.write({ level, msg });
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

    if (async) {
      this.__emitter.emit(EVENT_LOG_AS, level, message);
    } else {
      this.__emitter.emit(EVENT_LOG, level, message);
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
