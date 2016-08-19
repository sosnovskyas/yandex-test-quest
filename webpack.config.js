'use strict';
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = {
  watch: isDevelopment,
  devtool: isDevelopment ? 'cheap-module-inline-source-map' : null,

  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('style.css', {allChunks: true}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],

  module: {
    loaders: [
      {test: /\.js?$/, exclude: /node_modules/, loaders: ['babel']},
      {test: /\.scss$/, loader: ExtractTextPlugin.extract(['css', 'sass?sourceMap'])},
      {test: /\.json$/, exclude: /node_modules/, loader: 'json-loader'}
    ]
  },
  postcss: [autoprefixer]
};
