QRmote
======

Quick start
-----------

Start the websocket server

```javascript
cd server
node app.js
```

Create a client page with the following javascript and host it somewhere.

```javascript
QRmote.init('http://localhost:8080');
var client = new QRmote.Client();
```

Create a server page with a <div> on it named 'my_qrmote_div', and the following javascript.

```javascript
QRmote.init('http://localhost:8080');
var server = QRmote.Server({
  element: 'my_qrmote_div',
  clientUrl: 'http://path/to/your/client/page'
});
```