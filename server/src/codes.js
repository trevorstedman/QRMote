module.exports = (function() {
  
  var next = 1;
  
  return {
    
    generate: function() {
      return '' + next++;
    }
  };

})();