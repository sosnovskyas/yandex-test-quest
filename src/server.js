const express = require('express');
// const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');

const webpackCnfig = require('./../webpack.config');

const PORT = 3000;

const server = express();
const compiler = webpack(webpackCnfig);

server.use(webpackDevMiddleware(compiler, {
  publicPath: webpackCnfig.output.publicPath,
  hot: true,
  stats: {
    colors: true,
    hash: false,
    version: false,
    chunks: false,
    children: false
  }
}));

server.use(webpackHotMiddleware(compiler));

// server.use(bodyParser.json());
// server.use(bodyParser.urlencoded({extended: true}));

server.set('view engine', 'jade');
server.set('views', __dirname);

server.use('/api/data', (req, res) => (
  res.sendFile(path.join(__dirname, 'data.json'))
));

server.use('/', (req, res) => (
  res.render('index', { title: 'Hey', message: 'Hello there!'})
));

server.listen(PORT, 'localhost', err => {
  if (err) console.log(`=> ERROR:  ${err}`);
  console.log(`=> Webpack server is running on port ${PORT}`);
});
