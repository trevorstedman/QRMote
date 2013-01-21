exports.init = function(io) {

  var channels = {};

  return {
    
    get: function(index) {

      console.log('getting channel: ' + index);

      var channel = channels[index];
      if (!!channel) {
        console.log('got channel: ' + index);
        return channel;
      }

      console.log('creating channel: ' + index);

      return channels[index] = io.of('/server' + index);
    }
  };
};
