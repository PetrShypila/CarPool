import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';

/* eslint-disable no-console */

import * as markersService from '../api/v1/db/service/markersService';
import * as usersService from '../api/v1/db/service/usersService';
import * as authService from '../api/v1/db/service/authService';
import config from '../webpack.config.dev';

const port = 3000;
const app = express();
const loginRouter = express.Router();
const securityRouter = express.Router();
const apiRouter = express.Router();
const compiler = webpack(config);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

loginRouter.post('/login', authService.authenticate);

apiRouter.get('/v1/markers', markersService.sendMarkers);
apiRouter.get('/v1/users', usersService.sendUsers);

securityRouter.use(authService.authorize);
securityRouter.use('/api', apiRouter);
securityRouter.get('/', (req, res) => (res.sendFile(path.join( __dirname, '../view/index.html'))));

app.use(loginRouter);
app.use(securityRouter);
app.listen(port, function(err) {
    if (err) {
        console.log(err);
    }
});
