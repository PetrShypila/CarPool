import config from '../../config';

const {db} = config;

const UserSchema = new db.Schema({
  username: {type: String, required: true},
  firstname: {type: String, default: ''},
  lastname: {type: String, default: ''},
  phone: {type: String, default: ''},
  type: {type: String, default: ''},
  __v: { type: Number, select: false}
});

export default db.model('user', UserSchema);
