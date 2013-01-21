QRmote
======

Quick start
-----------

Start the websocket server

```javascript
cd server
node app.js
```

Create a "server" HTML page with a <div> on it named 'my_qrmote_div', and the following javascript (replace websockethost with the hostname
of your websocket server).

```html
<script src="qrmote.js"></script>
<script>
  QRmote.init('http://websockethost:8080');
  var server = QRmote.Server({
    element: 'my_qrmote_div',
    clientUrl: 'http://path/to/your/client/page' // do not use localhost here - it will not work on the phone
  });
</script>
```

Create a "client" HTML page with the following javascript, replacing 'websockethost' with the hostname of the host running your websocket server.

```html
<script src="qrmote.js"></script>
<script>
  QRmote.init('http://websockethost:8080');
  var client = new QRmote.Client();
</script>
```

This will render a QR code on the page inside the given div. Scanning this code with a smartphone opens the client web page on the phone.
Messages can be sent to the server page from the client page using `client.emit(message, data)` and received on the server page using
`server.on(message, handler)`.

Conversely, the server page can also communicate back to the client using `server.emit(message, data)`, the client receiving the message
using `client.on(message, handler)`.