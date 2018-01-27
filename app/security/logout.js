import logger from '../logging';

export default (req, res) => {
  logger.info(`Invalidating session ${JSON.stringify(req.session.id)}`);

  req.session.destroy(err => {
    if(err) {
      logger.error(`Error invalidating session ${JSON.stringify(req.session.id)}`);
    } else {
      logger.info(`Session ${JSON.stringify(req.session.id)} has been successfully invalidated`);
    }

    res.redirect('/');
  });
};
