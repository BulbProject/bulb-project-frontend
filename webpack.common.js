const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const eslint = require('./.eslintrc.json');

module.exports = {
  entry: [path.resolve(__dirname, 'src/index.tsx')],
  output: {
    filename: 'js/bundle.[hash:16].min.js',
    path: path.resolve(__dirname, 'build/'),
  },
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: true,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: false,
    warnings: true,
    publicPath: false,
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: eslint.settings['import/resolver'].alias.map.reduce((map, alias) => {
      return Object.assign(map, { [alias[0]]: path.resolve(__dirname, alias[1].slice(2)) });
    }, {}),
  },
  module: {
    rules: [
      {
        test: /\.ts(x)?$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
        include: [path.resolve(__dirname, 'src/assets')],
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'images/',
        },
        include: [path.resolve(__dirname, 'public/assets')],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      favicon: path.resolve(__dirname, 'public/favicon.svg'),
      buildDatetime: new Date(Date.now()).toLocaleString(),
      minify: {
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
};
