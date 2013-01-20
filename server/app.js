var
  express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server),
  store = require('./src/store'),
  serverSockets = require('./src/server-sockets'),
  clientSockets = require('./src/client-sockets');

// use port 8080 - this is what my hosting provider (Modulus) requires.
server.listen(8080);

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
app.get('/connect/:id', function(req, res) {
  var server = store.get(req.params.id);
  if (!!server) {
    server.get('qrmote_serverinfo', function(err, serverInfo) {
      res.redirect(serverInfo.remoteUrl + '?_qrmk=' + req.params.id);
    });
  }
  else {
    res.send(404);
  }
});


io.of('/initserver').on('connection', function(socket) {
  
  console.log('initserver socket connection initialised');
  
  socket.on('qmote_getchannel', function(channel, respond) {
    console.log('getting channel: ' + channel);
    new ServerChannel(channel);
    respond();
  });
});

var channels = {};

function ServerChannel(i) {
  
  console.log('getting channel: ' + i);
  
  var channel = channels[i];
  if(!!channel) {
    console.log('got channel: ' + i);
    return channel;
  }
  
  console.log('creating channel: ' + i);
  
  var channel = channels[i] = io.of('/server' + i);
  channel.on('connection', function(socket) {
    serverSockets.init(socket, i);
  });
  return channel;
}

io.of('/client').on('connection', function(socket) {
  clientSockets.init(socket);
});
