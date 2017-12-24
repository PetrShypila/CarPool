/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import webpack from 'webpack';
import path from 'path';

import sessionStore from './session/sessionHandler';
import errorHandler from './errorHandler';
import * as markersService from './api/v1/db/service/markersService';
import * as usersService from './api/v1/db/service/usersService';
import * as authService from './api/v1/db/service/authService';
import config from '../webpack.config.dev';

const port = 3000;
const app = express();
const compiler = webpack(config);
app.set('trust proxy', 1);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(session({
  secret: process.env.SECRET,
  store: sessionStore(session),
  resave: false,
  saveUninitialized: false,
  cookie: {
    path: '/',
    domain: 'localhost',
    httpOnly: false,
    maxAge: new Date(2018, 0, 1).getTime(),
    secure: false,
  }
}));

const publicRouter = express.Router();
const protectedRouter = express.Router();
const apiRouter = express.Router();

publicRouter.get('/favicon.ico', (req, res) => (res.sendStatus(404)));
publicRouter.get('/login', (req, res) => (res.sendFile(path.join( __dirname, '../view/index.html'))));
publicRouter.post('/authenticate', authService.authenticate);

apiRouter.get('/v1/markers', markersService.sendMarkers);
apiRouter.get('/v1/users', usersService.sendUsers);

protectedRouter.use(authService.authorize);
protectedRouter.get('/map', (req, res) => (res.sendFile(path.join( __dirname, '../view/index.html'))));
protectedRouter.use('/api', authService.authorize, apiRouter);

app.use(publicRouter);
app.use(protectedRouter);
app.use(errorHandler);
app.listen(port, function(err) {
    if (err) {
        console.log(err);
    }
});
