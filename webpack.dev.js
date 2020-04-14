const path = require('path');

const merge = require('webpack-merge');

const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    host: '127.0.0.1',
    port: 3000,
    publicPath: '/',
    contentBase: path.resolve(__dirname, 'dist/'),
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true,
  },
  plugins: [new ErrorOverlayPlugin(), ProgressBarPlugin()],
});
