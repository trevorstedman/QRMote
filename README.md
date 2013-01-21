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
  clientUrl: 'http://path/to/your/client/page' // do not use localhost here - it will not work on the phone
});
```

This will render a QR code on the page inside the given div. Scanning this code with a smartphone open the client web page on the phone.
Messages can be sent to the server page from the client page using `client.emit(message, data)` and received on the server page using
`server.on(message, handler)`.

Conversely, the server page can also communicate back to the client using `server.emit(message, data)`, the client receiving the message
using `client.on(message, handler)`.