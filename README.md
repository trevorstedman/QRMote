QRmote
======

Quick start
-----------

In order to get two web pages communicating with eachother, you will need to start a websocket server from the /server directory. The following
command will start the server on port 8080.

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
  var server = new QRmote.Server({
    element: 'my_qrmote_div',
    clientUrl: 'http://path/to/your/client/page' // do not use localhost here - otherwise it will not work on the phone
  });
  // send and receive messages here using server.on and server.emit
</script>
```

Create a "client" HTML page with the following javascript, replacing 'websockethost' with the hostname of the host running your websocket server.

```html
<script src="qrmote.js"></script>
<script>
  QRmote.init('http://websockethost:8080');
  var client = new QRmote.Client();
  // send and receive messages here using client.on and client.emit
</script>
```

This will render a QR code on the page inside the given div. Scanning this code with a smartphone opens the client web page on the phone.
Messages can be sent to the server page from the client page using `client.emit(message, data)` and received on the server page using
`server.on(message, handler)`.

Conversely, the server page can also communicate back to the client using `server.emit(message, data)`, the client receiving the message
using `client.on(message, handler)`.