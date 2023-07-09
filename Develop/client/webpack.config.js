const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
      }),
      new WebpackPwaManifest ({
        filename: 'mainfest.json',
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'A simple text editor application',
        background_color: 'white',
        theme_color: 'orange',
        start_url: '/',
        display: 'standalone',
        icons: [{
          src: path.resolve('src/assets/icons/icon_96x96.png'),
          sizes:[96, 128, 192, 256, 384, 512],
          purpose: 'any maskable',
        },
      ],
    }),
  ],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presents: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
