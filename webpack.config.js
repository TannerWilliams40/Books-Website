const webpack = require('webpack');
var path = require("path");

module.exports = {
  entry: {
    app: './src/App.jsx',
    vendor: [
      'react', 'react-dom', 'react-router', 'react-bootstrap', 'react-router-bootstrap',
      'whatwg-fetch', 'babel-polyfill',
    ],
  },
  output: {
    path: './static',
    filename: 'app.bundle.js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  ],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        include: path.join(__dirname, '/src'),
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1'],
        },
      },
      {
      test: /\.(gif|svg|jpg|png)$/,
      loader: "file-loader",
    }
    ],
  },
  devServer: {
    port: 8000,
    contentBase: 'static',
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
      },
    },
    historyApiFallback: true,
  },
  devtool: 'source-map',
};
