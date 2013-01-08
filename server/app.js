var
  express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  store = require('./src/store');

server.listen(8080);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.get('/connect/:id', function(req, res) {
  res.redirect('http://192.168.1.64/ipmote/example/remote?qr_key=' + req.params.id);
});

io.sockets.on('connection', function(socket) {

  // bridge the remote with the site
  socket.on('message', function(data) {
    var target = store.get(data.key);
    if (!!target) {
      target.emit('message', data);
    }
  });

  socket.on('get key', function(name, fn) {
    var key = store.add(socket);
    fn(key);
  });
});