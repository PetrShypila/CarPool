import app from './app';
import logger from './app/logging';

const port = process.env.PORT || 3000;

logger.info('Starting app in dev mode...');

app.listen(port, function (err) {
  if (err) {
    throw err
  }

  logger.info(`server is listening on ${port}...`);
});
