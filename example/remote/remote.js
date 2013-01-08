$(function() {
  
  $('body').on('click', '[data-command]', function(event) {
    var linkName = $(event.target).data('command');
    QRmote.emit('link_pressed', linkName);
  });
});