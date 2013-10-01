function SimpleDeferred() {

  var
    queue = [],
    args;

  this.done = function(fn) {
    if (!!queue) {
      queue.push(fn);
    }
    else {
      fn.apply(window, args);
    }
  };

  this.resolve = function() {
    if (!!args) {
      return;
    }
    args = arguments;
    for (var i = 0; i < queue.length; i++) {
      queue[i].apply(window, args);
    }
    queue = null;
  };
}
