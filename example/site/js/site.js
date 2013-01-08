var socket = io.connect('http://192.168.1.64:8081');
socket.on('site', function (data) {
  $('#output').append('Link ' + data.value + ' pressed<br>');
});