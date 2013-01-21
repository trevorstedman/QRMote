var store = {};

function randomString(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

function nextKey() {
  var key = randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
  return store[key] ? nextKey() : key;
}
  
exports.add = function(object) {
  var key = nextKey();
  store[key] = object;
  return key;
};

exports.get = function(key) {
  return store[key];
};

exports.remove = function(key) {
  var object = store[key];
  delete store[key];
  return object;
};