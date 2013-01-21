QRmote.EndPoint = function(channel, remoteKey) {

  this.callbacks = new Callbacks();
  this.socket = sockets.connect(channel);
  this.remoteKey = remoteKey;

  var self = this;

  this.socket.get(function(s) {
    s.on('message', function(json) {
      self.callbacks.fire(json.command, [json.data]);
    });
  });
};
  
QRmote.EndPoint.prototype = {

  on: function(command, action) {
    this.callbacks.on(command, action);
    return this;
  },

  emit: function(command, data) {
    this.socket.get(function(s) {
      s.emit('message', {
        key: this.remoteKey,
        command: command,
        data: data
      });
    });
    return this;
  }
};

