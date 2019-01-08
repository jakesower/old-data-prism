const http = require('http');
const express = require('express');
const config = require('./config.json');

const port = config.port;
const server = http.createServer();

const app = express();
app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.on('request', app);

app.use('/assets', express.static('dist'));
app.use('/data', express.static('dist/data'));
app.get('*', (_, res) => res.sendFile(__dirname + '/index.html'));

server.listen(port, () => console.log('http listening on port ' + port));
