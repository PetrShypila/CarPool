import session from 'express-session';

import sessionStore from './sessionstore';
import auth from './auth';
import logout from './logout';
import publicAccess from './publicAccess';
import protectedAccess from './protectedAccess';

function init(app) {
  app.use(session({
    secret: process.env.SECRET,
    resave: false,
    store: sessionStore(session),
    saveUninitialized: false,
    cookie: {
      path: '/',
      domain: 'localhost',
      httpOnly: false,
      maxAge: new Date(2018, 1, 1).getTime(),
      secure: false,
    }
  }));
}

export default {
  init,
  logout,
  publicAccess,
  protectedAccess,
  auth
};
