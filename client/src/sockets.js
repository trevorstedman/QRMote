function Sockets(socketHost) {
  
  var ready = new SimpleDeferred();

  loadScript(socketHost + '/socket.io/socket.io.js', function() {
    ready.resolve(io.connect(socketHost));
  });
  
  this.connect = function(channel) {

    var ready2 = new SimpleDeferred();
    ready.done(function() {
      ready2.resolve(io.connect([socketHost, (channel || '')].join('/')));
    });
    
    return {
      get: function(fn) {
        ready2.done(fn);
      }
    };
  };
}



