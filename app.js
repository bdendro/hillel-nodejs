import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import './src/models/index.js';
import Logger from './src/utils/logger/Logger.js';
import router from './src/routes/router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logger = new Logger();
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'src', 'views'));

app.use('/', router);

app.use((req, res, next) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).send('Internal server error');
});

app.listen(process.env.APP_PORT || 3000, () => {
  logger.info(
    `Express server is listening on port ${process.env.APP_PORT}`,
    false
  );
});

process.on('SIGINT', async () => {
  await sequelize.close();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await sequelize.close();
  process.exit(0);
});
