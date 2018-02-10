import MongoSession from 'connect-mongodb-session';

const mongoUrl = 'mongodb://petr:G190419g@ds229008.mlab.com:29008/heroku_lvt3mrbd';
const mongoCollection = 'sessions';

export default function init(session) {
  const mongoStore = MongoSession(session);
  const store = new mongoStore({ uri: mongoUrl, collection: mongoCollection });

  store.on('error', err => {
    if(err) {
      throw(err);
    }
  });

  return store;
}
