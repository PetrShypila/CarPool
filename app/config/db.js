/* eslint-disable no-console */
import mongoose from 'mongoose';
import logger from '../logging';

mongoose.connect('mongodb://petr:G190419g@ds229008.mlab.com:29008/heroku_lvt3mrbd', { useMongoClient: true });
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.once('error', (error) => { logger.error(`Database connection error:${error.message}`); });
db.once('open', () => { logger.info("Successfully connected to DB!"); });

export default mongoose;
