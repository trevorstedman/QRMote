window.QRmote = window.QRmote || {};

var sockets;
var initSocket;

QRmote.init = function(socketHost) {
  this.socketHost = socketHost;
  sockets = new Sockets(socketHost);
  initSocket = sockets.connect('initserver');
};