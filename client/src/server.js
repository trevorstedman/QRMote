QRmote.Server = function(config) {

  var
    connections = 0,
    seed = arguments.callee.seed = ++arguments.callee.seed || 1,
    connectionDiv = 'qrmote_info' + seed,

    self = object(new QRmote.EndPoint('server' + seed)),

    updateStatus = function() {
      var element = document.getElementById(connectionDiv);
      if (element) {
        if (connections) {
          element.style.color = 'green';
          element.innerHTML = connections + ' connection' + (connections > 1 ? 's' : '');
        }
        else {
          element.style.color = 'red';
          element.innerHTML = 'Waiting...';
        }
      }
    };

  initSocket.get(function(s1) {
    s1.emit('qmote_getchannel', seed, function() {
      
      self.socket.get(function(s2) {
        s2.emit('qrmote_initserver', { remoteUrl: config.clientUrl }, function(key) {

          self.remoteKey = key;

          var
            element = document.getElementById(config.element),
            qr = qrcode(4, 'L');

          qr.addData(QRmote.socketHost + '/connect/' + key);
          qr.make();

          var html = '<div style="width:132px">' +
                      '<div style="height:132px;margin-bottom:5px;">' + qr.createImgTag(4, 0) + '</div>' +
                      '<div id="' + connectionDiv + '" style="font-family:arial;text-align:center;font-size:11pt;font-weight:bold;"></div>' +
                     '</div>';

          element.innerHTML = html;
          updateStatus();
        });
      });
      
    });
  });

  self.on('qrmote_connect', function() {
    connections++;
    updateStatus();
  });

  self.on('qrmote_disconnect', function() {
    connections--;
    updateStatus();    
  });

  return self;

};

