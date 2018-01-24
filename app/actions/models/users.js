import config from '../../config';

const {db} = config;

const UserSchema = new db.Schema({
  username: {type: String, required: true},
  firstName: {type: String},
  lastName: {type: String},
  phone: {type: Number}
});

export default db.model('user', UserSchema);
