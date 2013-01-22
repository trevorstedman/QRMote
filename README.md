Prerequisites
=============

You will need [node](http://www.nodejs.org) (v0.8+) and grunt installed. Once node is installed you may install grunt using `sudo npm -g install grunt`.

Getting started
===============

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


Multiple servers on a single page
=================================

Simply invoke `new QRmote.Server` multiple times to create multiple servers on a single page. QRmote will multiplex the socket connection
for you.


The QRMote.Server object
========================

new QRMote.Server(options)
--------------------------

**options.clientUrl:** (required) the URL of the client page - the page to be loaded into the device scanning the QR code.


server.render(elementId, options)
---------------------------------

**elementId**: (required) the ID of the element to render the QR code in to.

**options.qrVersion**: (default: 4) the symbol version of the QR code to render.

**options.errorCorrection**: (default: L) the error correction level of the QR code to render. Can be 'L', 'M', or 'H'. Increasing the error correction may require you to increase the symbol version.

**options.qrSize**: (default: 4) the pixel size of the QR code.


server.on(eventName, fn(data))
------------------------------

**eventName**: (required) the name of the event to handle.

**fn**: (required) a function object which handles the incoming event. The function is passed a single data object containing the data emitted from the client. This object can be of any type.


server.emit(eventName, data)
----------------------------

**eventName**: (required) the name of the event to emit.

**data**: (required) the data to emit. This object can be of any type.


System events
-------------

**client_connect: count**

This event is sent by the client when it connects. The number of clients connected to this server is passed as data with this event.


**client_disconnect: count**

This event is sent by the client when it disconnects. The number of clients connected to this server is passed as data with this event.


The QRMote.Client object
========================

new QRMote.Client()
-------------------

client.share(elementId, options)
--------------------------------

**elementId**: (required) the ID of the element to render the QR code in to.

**options.qrVersion**: (default: 4) the symbol version of the QR code to render.

**options.errorCorrection**: (default: L) the error correction level of the QR code to render. Can be 'L', 'M', or 'H'. Increasing the error correction may require you to increase the symbol version.

**options.qrSize**: (default: 4) the pixel size of the QR code.


client.on(eventName, fn(data))
------------------------------

**eventName**: (required) the name of the event to handle.

**fn**: (required) a function object which handles the incoming event. The function is passed a single data object containing the data emitted from the server. This object can be of any type.


client.emit(eventName, data)
----------------------------

**eventName**: (required) the name of the event to emit.

**data**: (required) the data to emit. This object can be of any type.

