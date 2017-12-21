import User from '../models/users';

export function sendUsers(req, res) {
  debugger;
  User.find({}).then(users => {
    res.json(users);
  });
}

export function findUserByName(name) {
  return User.findOne({username: name.toLowerCase()})
}
