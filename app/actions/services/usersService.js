import axios from 'axios';

import logger from '../../logging';
import config from '../../config';
import User from '../models/users';

axios.defaults.headers.common[config.auth.key] = config.auth.val;

function signupUser(user) {
  return axios.post(config.auth.signupUrl, user);
}

function loginUser(username, password) {
  return axios.post(config.auth.loginUrl, {
    username,
    password
  });
}

function getAllUsers(req, res) {
  return User.find(Object.assign({}, req.query)).then(users => {
    res.json(users);
  });
}

function findByUsername(name) {
  return User.findOne({username: name.toLowerCase()});
}

function createUser(username) {
  const createdUser = new User({username});

  createdUser.save()
    .then(user => { logger.debug(`User ${JSON.stringify(user)} saved`); })
    .catch(error => { logger.error(`User ${JSON.stringify(createdUser)} has not been saved. Error ${error}`); });
}

export default {
  getAllUsers,
  signupUser,
  loginUser,
  createUser,
  findByUsername
};
