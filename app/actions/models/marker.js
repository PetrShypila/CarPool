import config from '../../config';

const {db} = config;
const MarkerSchema = new db.Schema({
  username: {type: String, required: true},
  type: {type: String, required: true},
  coordinates: {type: Object, required: true},
  __v: { type: Number, select: false}
});

export default db.model('marker', MarkerSchema);
