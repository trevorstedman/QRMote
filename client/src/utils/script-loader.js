function loadScript(url, done) {
  
  var script = document.createElement('script');
  script.type = "text/javascript";
  script.src = url;

  // append a script element as last child in parent and configure 
  // provided listener function for the script load event
  //
  // params:
  //   parent - (DOM element) (!nil) the parent node to append the script to
  //   scriptElt - (DOM element) (!nil) a new script element 
  //   listener - (function) (!nil) listener function for script load event
  //
  // Notes:
  //   - in IE, the load event is simulated by setting an intermediate 
  //     listener to onreadystate which filters events and fires the
  //     callback just once when the state is "loaded" or "complete"
  //
  //   - Opera supports both readyState and onload, but does not behave in
  //     the exact same way as IE for readyState, e.g. "loaded" may be
  //     reached before the script runs.

  var safelistener = function() {
    try {
      done();
    } catch(e) {
      // do something with the error
    }
  };

  // Opera has readyState too, but does not behave in a consistent way
  if(script.readyState && script.onload !== null) {
    // IE only (onload===undefined) not Opera (onload===null)
    script.onreadystatechange = function() {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        // Avoid memory leaks (and duplicate call to callback) in IE
        script.onreadystatechange = null;
        safelistener();
      }
    };
  }
  else {
    // other browsers (DOM Level 0)
    script.onload = safelistener;
  }
  document.head.appendChild(script);
}