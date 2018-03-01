import config from '../../config';

const {db} = config;
const ConnectionSchema = new db.Schema({
  requester: {type: String, required: true},
  receiver: {type: String, required: true},

  datetime_created: {type: Date, required: true},
  datetime_updated: {type: Date, required: false},

  service: {type: String, required: true},
  status: {type: String, required: true},

  __v: { type: Number, select: false}
});

export default db.model('connection', ConnectionSchema);
