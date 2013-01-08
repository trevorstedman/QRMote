var socket = io.connect('http://192.168.1.64:8081');

$(function() {
  
  $('body').on('click', '[data-command]', function(event) {
    var command = $(event.target).data('command');
    socket.emit('remote', { value: command });
  });
});