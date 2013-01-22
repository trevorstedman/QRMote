QRmote.Server = function(config) {

  var
    channel = arguments.callee.channel = ++arguments.callee.channel || 1,
    gotChannel = new SimpleDeferred(),
    self = object(new QRmote.EndPoint('server' + channel)),
    qrCode;

  initSocket.get(function(s1) {
    s1.emit('qmote_getchannel', channel, function() {
      gotChannel.resolve();
    });
  });
 
  self.render = function(elementId, options) {

    options = options || {};

    gotChannel.done(function() {
      self.socket.get(function(s2) {

        s2.emit('qrmote_initserver', { remoteUrl: config.clientUrl }, function(serverId) {

          self.id = serverId;
          qrCode = new QRcode(elementId, serverId, {
            type: options.qrType || 4,
            errorCorrection: options.errorCorrection || 'L',
            size: options.qrSize || 4,
            indicator: true
          });
        });

      });
    });
    return this;
  };

  self.on('client_connect', function(data) {
    qrCode.updateStatus(data.count);
  });

  self.on('client_disconnect', function(data) {
    qrCode.updateStatus(data.count);    
  });

  return self;
};

