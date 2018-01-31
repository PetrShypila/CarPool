import logger from '../logging';
// Filter for pages which should be
// shown for user who isn't logged in
export default (req, res, next) => {
  logger.info(`Public access. Receiving ${req.method} request for ${JSON.stringify(req.url)}`);

  if(req.session.user) {
    logger.info(`Public access. User exist in session ${JSON.stringify(req.session.user)}. Redirecting to /home`);
    res.redirect('/home');
  } else {
    logger.info(`Public access. Session doesn't exist. Executing next middleware `);
    return next();
  }
};
