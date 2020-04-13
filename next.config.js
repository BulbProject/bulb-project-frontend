const withPWA = require('next-pwa');

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  exportTrailingSlash: true,
  webpack: config => {
    config.module.rules.push(
      ...[
        {
          test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
          loader: require.resolve('file-loader'),
          options: {
            name: 'assets/[name].[hash:8].[ext]',
          },
        },
      ]
    );

    return config;
  },
});


