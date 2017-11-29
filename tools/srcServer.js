import express from 'express';
import webpack from 'webpack';
import path from 'path';
import open from 'open';

/* eslint-disable no-console */

import * as markersService from '../api/v1/db/service/markersService';
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
  markersService.getMarkers().then((users) => {

    let markers = users.map(u => {
      let marker = u.coordinates;
      marker.id = u._id;
      return marker;
    });

    res.json(markers);
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
