QRmote.Client = function() {

  var
    match = window.location.search.match('_qsid=([^&;]+)'),
    serverId = match && match[1],
    self = object(new QRmote.EndPoint('client'));

  if (!serverId) {
    throw 'No server ID (_qsid) in URL.';
  }

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
