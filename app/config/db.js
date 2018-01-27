/* eslint-disable no-console */
import mongoose from 'mongoose';
import logger from '../logging';

mongoose.connect('mongodb://localhost:27017/CarPool', { useMongoClient: true });
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.once('error', (error) => { logger.error(`Database connection error:${error.message}`); });
db.once('open', () => { logger.info("Successfully connected to DB!"); });

export default mongoose;
