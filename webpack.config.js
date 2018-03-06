const path = require('path');
const webpack = require('webpack');


const config = {
  devtool: 'inline-source-map',

  entry: [
    path.resolve(__dirname, 'polyfills'),
    path.resolve(__dirname, 'app/view/index')
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: path.resolve(__dirname, 'app/view'),
    watchContentBase: false,
    hotOnly: true,
    overlay: true,
  },

  plugins: [],

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'app/view'),
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /(\.css)$/,
        include: path.resolve(__dirname, 'app/view/styles'),
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};

module.exports = function(env) {

  if(env === 'development') {

    config.plugins.push(
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    );

  } else {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        }
      })
    );
  }

  return config;
};
