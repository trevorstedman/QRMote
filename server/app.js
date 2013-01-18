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
  var server = store.get(req.params.id);
  if (!!server) {
    server.get('qrmote_remoteurl', function(err, url) {
      res.redirect(url + '?_qrmk=' + req.params.id);
    });
  }
  else {
    res.send(404);
  }
});

var channels = {};

function getChannel(i) {
  
  var channel = channels[i];
  if(!!channel) {
    return channel;
  }
  
  var channel = channels[i] = io.of('/server' + i);
  
  channel.on('connection', function(socket) {

    // bridge the remote with the site
    socket.on('message', function(data) {
      socket.get('qrmote_clients', function(err, clients) {
        for (var name in clients) {
          var client = clients[name];
          if (!!client) {
            client.emit('message', data);
          }
        }
      });
    });

    socket.on('qrmote_initserver', function(config, respond) {
      var serverId = store.add(socket);
      respond(serverId);
      socket.set('qrmote_remoteurl', config.remoteUrl);
      socket.set('qrmote_clients', {});
    });

    socket.on('disconnect', function() {
      socket.get('qrmote_clients', function(err, clients) {
        for (var name in clients) {
          var client = clients[name];
          client.emit('message', {
            command: 'qrmote_disconnect'
          });
        }
      });
    });
  });

  return channel;
}

io.of('/initserver').on('connection', function(socket) {
  
  socket.on('qmote_getchannel', function(channel, respond) {
    getChannel(channel);
    respond();
  });
});

io.of('/client').on('connection', function(socket) {

  // bridge the remote with the site
  socket.on('message', function(data) {
    socket.get('qrmote_clientid', function(err, clientId) {
      var server = store.get(clientId);
      if (!!server) {
        server.emit('message', data);
      }
    });
  });

  socket.on('qrmote_initclient', function(clientId) {
    socket.set('qrmote_clientid', clientId);
    var server = store.get(clientId);
    if (!!server) {
      server.emit('message', {
        command: 'qrmote_connect',
        data: clientId
      });
      server.get('qrmote_clients', function(err, clients) {
        clients[clientId] = socket;
        server.set('qrmote_clients', clients);
      });
    }
  });

  socket.on('disconnect', function() {
    socket.get('qrmote_clientid', function(err, clientId) {
      var target = store.get(clientId);
      if (!!target) {
      target.emit('message', {
        command: 'qrmote_disconnect',
        data: clientId
      });
      }
    });
  });

});
