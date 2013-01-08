module.exports = (function() {
  
  var
    nextKey = 1,
    store = {},

    randomString = function(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
      return result;
    },
  
    nextKey = function() {
      var key = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
      return store[key] ? nextKey() : key;
    };
  
  return {
    
    add: function(object) {
      var key = nextKey();
      store[key] = object;
      return key;
    },

    get: function(key) {
      return store[key];
    }
  };

})();