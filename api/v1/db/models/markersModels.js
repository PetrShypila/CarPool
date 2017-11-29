import mongoose from './connection';

const MarkerSchema = new mongoose.Schema({
  username: String,
  type: String,
  coordinates: Object
});

export default mongoose.model('Marker', MarkerSchema);
