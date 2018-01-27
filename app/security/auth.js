import  UserService from '../actions/services/usersService';

import logger from '../logging';

function login(req, res) {
  logger.debug(`Logging user ${req.body.username}`);

  UserService.loginUser(req.body.username, req.body.password).then(response => {
    switch(response.status) {
      case 200:
        logger.debug(`User ${req.body.username} successfully logged in. Saving into session store`);

        UserService.findByUsername(response.data.username).then(user => {

          let firstLogin = user == null;

          logger.debug(`Received user profile ${JSON.stringify(user)}`);

          req.session.user = firstLogin ? UserService.createUser(response.data.username) : user;
          req.session.save(()=> {
            res.redirect(firstLogin ? '/profile' : '/home');
          });
        }).catch(error => {
          res.status(500).json({error: error.message});
        });

        break;
      case 401:
        logger.warn(`User ${response.data.username} provided incorrect credentials`);
        res.status(response.status).end();
        break;
      case 404:
      case 500:
        res.status(response.status).end(); break;
      default:
        res.status(response.status).send("Unexpected error."); break;
    }
  }).catch(error => {
    logger.error(`Cannot login user ${req.body.username}. Error message: ${JSON.stringify(error.message)}`);
    res.status(500).json({error: error.message});
  });
}

function signup(req, res) {
  UserService.signupUser(req.body).then(response => {
    switch(response.status) {
      case 201:
        res.redirect('/login'); break;
      case 500:
      case 409:
        res.status(response.status).end(); break;
      default:
        res.status(response.status).send("Unexpected error."); break;
    }
  }).catch(error => {
    res.status(500).json({error: error.message});
  });

}

export default {
  login,
  signup
};
