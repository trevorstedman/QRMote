var store = require('./store');

exports.init = function(socket) {

  socket.on('qrmote_initclient', function(serverId) {

    console.log('initclient with: ' + serverId);
    socket.set('serverid', serverId);

    var server = store.get(serverId);
    if (!!server) {
      server.connect(socket);
    }
  });

  // bridge the remote with the site
  socket.on('message', function(data) {

    console.log('client sent message');

    socket.get('serverid', function(err, serverId) {

      var server = store.get(serverId);
      if (!!server) {
        console.log('forwarding message to server: ' + serverId);
        server.socket.emit('message', data);
      }
    });
  });

  socket.on('disconnect', function() {

    socket.get('serverid', function(err, serverId) {

      var server = store.get(serverId);
      if (!!server) {
        console.log('got server: ' + server);
        server.disconnect(socket);
      }
    });
  });

};