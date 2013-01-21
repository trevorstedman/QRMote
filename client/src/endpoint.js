QRmote.EndPoint = function(channel) {

  this.callbacks = new Callbacks();
  this.socket = sockets.connect(channel);

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
        command: command,
        data: data
      });
    });
    return this;
  }
};

