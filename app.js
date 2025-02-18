import http from 'node:http';
import Logger from './logger/Logger.js';
import sleep from './utils/sleep.js';

const logger = new Logger();
const app = http.createServer();

app.on('request', async (req, res) => {
  console.log({ url: req.url, method: req.method });

  await sleep(Math.floor(Math.random() * 2001 + 1000));

  if (Math.floor(Math.random() * 11) === 10) {
    res
      .writeHead(500, { 'content-type': 'text/plain' })
      .end('Internal Server Error');
    logger.error('Internal Server Error');
  } else {
    res.writeHead(200, { 'content-type': 'text/plain' }).end(`Success!`);
    logger.info('Success!');
  }
});

app.listen(process.env.APP_PORT, () => {
  logger.info(`HTTP server is listening on port ${process.env.APP_PORT}`);
});
