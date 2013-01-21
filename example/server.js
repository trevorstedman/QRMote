var
  express = require('express'),
  app = express(),
  server = require('http').createServer(app);

server.listen(8081);
app.use(express.static(__dirname));