QRmote.Client = function() {

  var
    match = window.location.search.match('_qrmk=([^&;]+)'),
    remoteKey = match && match[1],
    self = object(new QRmote.EndPoint('client', remoteKey));

  self.socket.get(function(s) {
    s.emit('qrmote_initclient', remoteKey);
  });

  return self;
};
