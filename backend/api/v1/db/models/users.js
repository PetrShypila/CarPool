import mongoose from '../connection';

const UserSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: Number,
  password: String
});

export default mongoose.model('user', UserSchema);
