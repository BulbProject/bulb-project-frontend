const withPlugins = require('next-compose-plugins');

const withPWA = require('next-pwa');
const withImages = require('next-images');

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: 'public',
        },
      },
    ],
    [withImages, { inlineImageLimit: 16384 }],
  ],
  {
    exportTrailingSlash: true,
    webpack: (config, { isServer }) => {
      config.module.rules.push(
        ...[
          {
            test: /\.md$/,
            use: 'raw-loader',
          },
        ]
      );

      if (!isServer) {
        // eslint-disable-next-line no-param-reassign
        config.node = {
          fs: 'empty',
        };
      }

      return config;
    },
  }
);
