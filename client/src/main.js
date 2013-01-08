var QRmote = (function() {

  var
    socket = io.connect('http://192.168.1.64:8080'),
    callbacks = {},
    match = window.location.search.match('qr_key=([^&;]+)'),
    remoteKey = match && match[1];

  socket.on('message', function(json) {
    var action = callbacks[json.command];
    if (!!action) {
      action(json.data);
    }
  });

  return {
    
    render: function(id) {

      socket.emit('get key', null, function(siteKey) {
        
        var
          element = document.getElementById(id),
          qr = qrcode(4, 'L');

        qr.addData('http://192.168.1.64:8080/connect/' + siteKey);
        qr.make();

        element.innerHTML = qr.createImgTag(4, 4);
      });

    },

    on: function(command, action) {
      callbacks[command] = action;
    },

    emit: function(command, data) {
      socket.emit('message', {
        key: remoteKey,
        command: command,
        data: data
      });
    }
  };

})();
