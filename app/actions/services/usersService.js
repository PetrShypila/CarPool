import axios from 'axios';

import config from '../../config';
import User from '../models/users';

axios.defaults.headers.common[config.auth.key] = config.auth.val;

function getAllUsers(req, res) {
  return User.find(Object.assign({}, req.query)).then(users => {
    res.json(users);
  });
}

function signupUser(user) {
  return axios.post('http://localhost:4000/signup', user);
}

function loginUser(username, password) {
  return axios.post('http://localhost:4000/login', {
    username,
    password
  });
}

function findUserByName(name) {
  return User.findOne({username: name.toLowerCase()});
}

export default {
  getAllUsers,
  signupUser,
  loginUser,
  findUserByName
};
