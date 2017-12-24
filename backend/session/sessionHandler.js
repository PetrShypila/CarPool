import MongoSession from 'connect-mongodb-session';

const mongoUrl = 'mongodb://localhost:27017/Sessions';
const mongoCollection = 'sessions';

export default function (session) {
  const mongoStore = MongoSession(session);
  const store = new mongoStore({ uri: mongoUrl, collection: mongoCollection });

  store.on('error', err => {
    if(err) {
      throw(err);
    }
  });

  return store;
}
