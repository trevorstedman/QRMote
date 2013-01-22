QRmote
======

Prerequisites
-------------

You will need [node](http://www.nodejs.org) (v0.8+) and grunt installed. Once node is installed you may install grunt using `sudo npm -g install grunt`.

Quick start
-----------

First, build a copy of the client application.

```bash
grunt build
```

The client library will be written to `client/dist/qrmote.js`.

In order to get two web pages communicating with eachother, you will need to start a websocket server from the /server directory. Run the
following command from inside the server directory, which will start the server on port 8080.

```bash
node app.js
```

Create a "server" HTML page with a <div> on it named 'my_qrmote_div', and the following javascript (replace websockethost with the hostname
of your websocket server). Put qrmote.js in the same directory (or put it in a known place and modify the script tag src path appropriately).

```html
<script src="qrmote.js"></script>
<script>
  QRmote.init('http://websockethost:8080');
  var server = new QRmote.Server({
    clientUrl: 'http://path/to/your/client/page' // do not use localhost here - otherwise it will not work on the phone
  })
  .render('my_qrmote_div');
  // send and receive messages here using server.on and server.emit
</script>
```

Create a "client" HTML page with the following javascript, replacing 'websockethost' with the hostname of your websocket server.
Put qrmote.js in the same directory (or put it in a known place and modify the script tag src path appropriately).

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