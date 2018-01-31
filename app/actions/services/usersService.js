import axios from 'axios';

import logger from '../../logging';
import config from '../../config';
import User from '../models/users';

axios.defaults.headers.common[config.auth.key] = config.auth.val;

function signUpUser(user) {
  return axios.post(config.auth.signupUrl, user);
}

function loginUser(username, password) {
  const xhr = axios.post(config.auth.loginUrl, {
    username,
    password
  });

  return xhr;
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

  return createdUser.save();
}

export default {
  getAllUsers,
  signUpUser,
  loginUser,
  createUser,
  findByUsername
};
