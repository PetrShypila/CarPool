import config from '../../config';

const {db} = config;

const UserSchema = new db.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
});

export default db.model('user', UserSchema);
