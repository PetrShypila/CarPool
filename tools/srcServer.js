import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';

/* eslint-disable no-console */

import * as markersService from '../api/v1/db/service/markersService';
import * as usersService from '../api/v1/db/service/usersService';
import config from '../webpack.config.dev';

const port = 3001;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/api/v1/markers', function(req, res) {
  markersService.getMarkers().then((markers) => {
    res.json(markers);
  });
});

app.get('/api/v1/users', function(req, res) {
  usersService.getUsers().then((users) => {
    res.json(users);
  });
});

app.get('*', function(req, res) {
    res.sendFile(path.join( __dirname, '../view/index.html'));
});

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${port}`);
    }
});
