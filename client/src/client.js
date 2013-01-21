QRmote.Client = function() {

  var
    match = window.location.search.match('_qrmk=([^&;]+)'),
    serverId = match && match[1],
    self = object(new QRmote.EndPoint('client'));

  self.socket.get(function(s) {
    s.emit('qrmote_initclient', serverId);
  });
  
  self.share = function(elementId, options) {
    options = options || {};
    new QRcode(elementId, serverId, {
      type: options.qrType || 4,
      errorCorrection: options.errorCorrection || 'L',
      size: options.qrSize || 4,
      indicator: false
    });
  };

  return self;
};
