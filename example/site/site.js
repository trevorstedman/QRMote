QRmote.on('link_pressed', function(data) {
  $('#output').append('Link ' + data + ' pressed<br>');
});

$(function() {
  QRmote.render('qmote-qrcode');
});