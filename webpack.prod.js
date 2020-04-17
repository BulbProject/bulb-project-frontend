const path = require('path');

const merge = require('webpack-merge');

const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    usedExports: true,
    sideEffects: false,
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        toplevel: true
      }
    })],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FaviconsWebpackPlugin({
      logo: path.resolve(__dirname, 'public/favicon.svg'),
      favicons: {
        appName: 'Bulb Project',
        appShortName: 'Bulb Project',
        orientation: 'portrait',
        display: 'standalone',
        lang: 'en-US',
        start_url: '/index.html',
        background: '#fcfcfc',
        theme_color: '#1a81db',
        loadManifestWithCredentials: true,
        appleStatusBarStyle: 'white-translucent',
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: false,
          yandex: false
        },
      },
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new RobotstxtPlugin({
      filePath: '/robots.txt',
      policy: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(css|js|html)$/,
      minRatio: 0.4,
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      generateStatsFile: true,
    }),
  ],
});
