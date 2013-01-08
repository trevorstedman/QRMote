var
  app = require('express')(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  codes = require('./src/codes');

server.listen(8081);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket) {

  // bridge the remote with the site
  socket.on('remote', function(data) {
    socket.broadcast.emit('site', data);
  });
});