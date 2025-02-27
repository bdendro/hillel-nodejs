import express from 'express';
import Logger from './logger/Logger.js';
import router from './routes/router.js';

const logger = new Logger();
const app = express();

app.use(express.json());
app.use('/', router);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Internal server error');
});

app.listen(process.env.APP_PORT || 3000, () => {
  logger.info(`Express server is listening on port ${process.env.APP_PORT}`);
});
