import  UserService from '../actions/services/usersService';

import logger from '../logging';

function login(req, res) {
  logger.debug(`Logging user ${req.body.username}`);
  UserService.loginUser(req.body.username, req.body.password).then(response => {

    logger.debug(`User ${req.body.username} successfully logged in. Saving into session store`);

    UserService.findByUsername(response.data.username).then(user => {

      const firstLogin = user == null;
      const redirectUrl = firstLogin ? '/profile' : '/home';

      if(firstLogin) {

        logger.debug(`First user ${JSON.stringify(req.body.username)} login. Creating new profile and redirecting to ${redirectUrl}`);

        UserService.createUser(response.data.username).then(createdUser => {
          logger.debug(`User created: ${JSON.stringify(createdUser)}`);
          saveUserIntoSession(req, res, redirectUrl, createdUser);
        }).catch(err => {
          logger.error(`Error saving user ${response.data.username} into database. Error: ${err.message}`);
          res.status(500).end();
        });

      } else {
        logger.debug(`User ${JSON.stringify(user)} logging in with already created profile. Redirecting to ${redirectUrl}`);
        saveUserIntoSession(req, res, redirectUrl, user);
      }

    }).catch(error => {
      logger.error(`Error finding user ${req.body.username}. Error: ${error.message}`);
      res.status(500).end();
    });

    logger.info("Login finished!");

  }).catch(error => {
    debugger;
    switch(error.response.status) {
      case 401:
        logger.warn(`User ${req.body.username} provided incorrect credentials`);
        res.status(error.response.status).end();
        return;
      case 404:
      case 500:
        logger.error(`Error receiving data from auth server for user ${req.body.username}`);
        res.status(error.response.status).end();
        return;
      default:
        logger.error(`Unexpected response from auth server for user ${req.body.username}`);
        res.status(error.response.status).send({error: "Unexpected error."});
    }
  });
}

function saveUserIntoSession(req, res, url, user) {
  req.session.user = user;
  req.session.save(()=> {
    res.redirect(url);
  });
}

function signup(req, res) {
  UserService.signUpUser(req.body).then(response => {
    switch(response.status) {
      case 201:
        logger.info(`Successfully registered user ${JSON.stringify(req.body)}`);
        res.redirect('/login'); return;
      case 500:
      case 409:
        logger.error(`Error appeared while registering new user ${JSON.stringify(req.body)}. Response code ${response.status}`);
        res.status(response.status).end(); return;
      default:
        res.status(response.status).send({error: "Unexpected error."}); return;
    }
  }).catch(error => {
    logger.error(`Unexpected error appeared while registering new user ${JSON.stringify(req.body)}. Response code ${error.message}`);
    res.status(500).json({error: error.message});
  });

}

function logout(req, res) {
  const sessionId = req.session.id;
  logger.info(`Invalidating session ${JSON.stringify(sessionId)}`);

  req.session.destroy(err => {
    if (err) {
      logger.error(`Error invalidating session ${JSON.stringify(sessionId)}`);
    } else {
      logger.info(`Session ${JSON.stringify(sessionId)} has been successfully invalidated`);
    }

    res.redirect('/');
  });
}

export default {
  login,
  signup,
  logout
};
