import logger from '../logging';

// Filter for pages which should be
// shown for user who isn't logged in
export default (req, res, next) => {
  logger.info(`Protected access. Receiving ${req.method} request for ${JSON.stringify(req.url)}`);

  if(!req.session.user) {
    logger.info(`Protected access. Session doesn't exist. Redirecting to /login`);
    res.redirect('/login');
  } else {
    logger.info(`Protected access. Session ${req.session.id}. User ${JSON.stringify(req.session.user)}. Executing next middleware `);
    next();
  }
};
