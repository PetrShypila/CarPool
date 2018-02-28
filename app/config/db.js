/* eslint-disable no-console */
import mongoose from 'mongoose';
import logger from '../logging';

const mongoUrl = process.env.DEV ? `mongodb://localhost:27017/CarPool` : 'mongodb://petr:G190419g@ds229008.mlab.com:29008/heroku_lvt3mrbd';

mongoose.connect(mongoUrl, { useMongoClient: true });
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.once('error', (error) => { logger.error(`Database ${mongoUrl} connection error:${error.message}`); });
db.once('open', () => { logger.info(`Successfully connected to DB: ${mongoUrl}`); });

export default mongoose;
