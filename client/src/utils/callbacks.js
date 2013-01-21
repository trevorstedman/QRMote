var Callbacks = function() {

  var callbacks = {};

  this.fire = function(name, args) {
    var funcs = callbacks[name];
    if (!!funcs) {
      for (var i = 0; i < funcs.length; i++) {
        funcs[i].apply(window, args);
      }
    }
  };

  this.on = function(name, callback) {
    var funcs = callbacks[name];
    if (!funcs) {
      funcs = callbacks[name] = [];
    }
    funcs.push(callback);
  };
};

