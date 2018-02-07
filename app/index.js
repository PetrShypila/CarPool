/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';

import config from '../webpack.config.dev';
import security from './security';
import routes from './routes';

const app = express();
const compiler = webpack(config);

app.use(bodyParser.json());
app.use(express.static('app/static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

security.init(app);
routes.init(app);

export default app;
