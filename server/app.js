var
  express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  store = require('./src/store'),
  nconf = require('nconf'),
  serverSockets = require('./src/server-sockets'),
  clientSockets = require('./src/client-sockets'),
  serverChannels = require('./src/server-channels').init(io);

nconf.file({ file: 'config.json' });
nconf.file({ file: 'local.json' });

// use port 8080 - this is what my hosting provider (Modulus) requires.
server.listen(nconf.get('websocket.server.port'));

// create a directory for serving static content - may be useful later
app.use(express.static(__dirname + '/public'));

/**
 * Display something by default.
 */
app.get('/', function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

/**
 * Redirect to the client (smartphone) URL for a given server ID.
 * This is basically just a URL shortening service which allows us to keep the
 * QR codes as simple as possible.
 */
app.get('/c/:id', function(req, res) {
  var server = store.get(req.params.id);
  if (!!server) {
    res.redirect(server.remoteUrl + '?_qsid=' + req.params.id);
  }
  else {
    res.send(404);
  }
});

io.of('/initserver').on('connection', function(socket) {
  console.log('initserver socket connection initialised');
  
  socket.on('qmote_getchannel', function(channelIndex, respond) {
    console.log('getting channel: ' + channelIndex);

    var channel = serverChannels.get(channelIndex);
    channel.on('connection', function(socket) {
      serverSockets.init(socket, channelIndex);
    });

    respond();
  });
});

io.of('/client').on('connection', function(socket) {
  clientSockets.init(socket);
});
