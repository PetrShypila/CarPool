import axios from 'axios';

import logger from '../../logging';
import config from '../../config';
import User from '../models/users';
import Marker from "../models/marker";

axios.defaults.headers.common[config.auth.key] = config.auth.val;

function signUpUser(user) {
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
    logger.debug(`UserService.getAllUsers retrieved users from DB: ${users}`);
    res.json(users);
  });
}

function findByUsername(name) {
  return User.findOne({username: name.toLowerCase()});
}

function getActiveUser(req, res) {
  return User.findOne({username: req.session.user.username.toLowerCase()}).then(user => {
    res.json(user);
  }).catch(err => {
    return res.status(500).send({ error: err.message });
  });
}

function updateUser(req, res, next) {
  req.body.user.username = req.session.user.username;

  delete req.body.user._id;

  const {username} = req.body.user;

  logger.info(`Saving user into datastore: ${JSON.stringify(req.body.user)}`);

  User.findOneAndUpdate({username}, req.body.user, {new:true}, (err, doc) => {
    if (err) {
      logger.error(`Error saving user ${JSON.stringify(req.body.user)} into database. Error message ${err.message}`);
      return res.status(500).send({ error: err.message });
    } else {
      logger.info(`Saved user body: ${JSON.stringify(doc)}`);
      req.session.user = doc;
      res.locals.user = doc;
      return next();
    }
  });
}

function createUser(username) {
  const createdUser = new User({username});

  return createdUser.save();
}

export default {
  getAllUsers,
  updateUser,
  signUpUser,
  loginUser,
  createUser,
  getActiveUser,
  findByUsername
};
