QRmote.Server = function(config) {

  var
    channel = arguments.callee.channel = ++arguments.callee.channel || 1,
    self = object(new QRmote.EndPoint('server' + channel)),
    qrCode;

  initSocket.get(function(s1) {
    s1.emit('qmote_getchannel', channel, function() {
        
      self.socket.get(function(s2) {
        s2.emit('qrmote_initserver', { remoteUrl: config.clientUrl }, function(serverId) {

          self.id = serverId;
          qrCode = new QRcode(config.element, serverId, {
            type: config.qrType || 4,
            errorCorrection: config.errorCorrection || 'L',
            size: config.qrSize || 4,
            indicator: true
          });
        });
      });
    });
  });

  self.on('client_connect', function(data) {
    qrCode.updateStatus(data.count);
  });

  self.on('client_disconnect', function(data) {
    qrCode.updateStatus(data.count);    
  });

  return self;
};

