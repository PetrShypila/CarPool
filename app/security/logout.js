import logger from '../logging';

export default (req, res) => {
  const sessionId = req.session.id;
  logger.info(`Invalidating session ${JSON.stringify(sessionId)}`);

  req.session.destroy(err => {
    if(err) {
      logger.error(`Error invalidating session ${JSON.stringify(sessionId)}`);
    } else {
      logger.info(`Session ${JSON.stringify(sessionId)} has been successfully invalidated`);
    }

    res.redirect('/');
  });
};
