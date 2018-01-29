import config from '../../config';

const {db} = config;
const MarkerSchema = new db.Schema({
  username: String,
  type: String,
  coordinates: Object
});

export default db.model('marker', MarkerSchema);
