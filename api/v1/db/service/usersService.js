import User from '../models/users';

export function getUsers() {
  return new Promise((resolve, reject) => {
    User.find({}).then(users => {
      resolve(users);
    });
  });
}
