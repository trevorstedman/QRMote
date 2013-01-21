var store = require('./store');

function Server(socket, channel, remoteUrl) {

  this.socket = socket;
  this.channel = channel;
  this.remoteUrl = remoteUrl;
  this.count = 0;
  this.nextClientId = 1;
  this.clients = {};

  var self = this;

  // bridge the remote with the site
  socket.on('message', function(data) {
    console.log('server sent message on channel: ' + channel);
    var clients = self.clients;
    for (var clientId in clients) {
      var client = clients[clientId];
      if (!!client) {
        console.log('sending message to client ' + clientId + ' on channel: ' + channel);
        client.emit('message', data);
      }
    }
  });

  socket.on('disconnect', function() {

    console.log('server disconnected on channel: ' + channel);

    var clients = self.clients;
    for (var name in clients) {
      console.log('sending server disconnect message to client: ' + name + ' on channel: ' + channel);
      var client = clients[name];
      client.emit('message', {
        command: 'server_disconnect'
      });
    }

    store.remove(self.id);
  });

  this.connect = function(clientSocket) {

    var clientId = this.nextClientId++;

    console.log('adding client to server socket map: ' + clientId);

    var clients = self.clients;
    clients[clientId] = clientSocket;
    clientSocket.set('clientid', clientId);

    self.count++;
    self.socket.emit('message', {
      command: 'client_connect',
      data: {
        clientId: clientId,
        count: self.count
      }
    });

  };

  this.disconnect = function(clientSocket) {

    clientSocket.get('clientid', function(err, clientId) {
      
      console.log('removing client from server socket map: ' + clientId);

      var clients = self.clients;
      delete clients[clientId];

      self.count--;
      self.socket.emit('message', {
        command: 'client_disconnect',
        data: {
          clientId: clientId,
          count: self.count
        }
      });
    });

  };

}

exports.init = function(socket, channel) {

  console.log('socket created for channel: ' + channel);

  socket.on('qrmote_initserver', function(config, respond) {
    var server = new Server(socket, channel, config.remoteUrl);
    var serverId = store.add(server);
    server.id = serverId;
    console.log('server initialised with id: ' + serverId + ' on channel: ' + channel);
    respond(serverId);
  });
};


