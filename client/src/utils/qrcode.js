function QRcode(elementId, key, options) {

  options = options || {};

  this.key = key;
  this.infoDiv = 'qrmote_info_' + this.key;

  var qr = qrcode(options.type || 4, options.errorCorrection || 'L');
  qr.addData(QRmote.socketHost + '/connect/' + key);
  qr.make();

  var html = '<div style="width:132px">' +
              '<div style="height:132px;margin-bottom:5px;">' + qr.createImgTag(options.size || 4, options.margin || 0) + '</div>' +
              (options.indicator ?
                '<div id="' + this.infoDiv + '" style="font-family:arial;text-align:center;font-size:11pt;font-weight:bold;"></div>'
              :
                '') +
             '</div>';

  document.getElementById(elementId).innerHTML = html;
  this.updateStatus();
}
  
QRcode.prototype.updateStatus = function(connections) {

  var element = document.getElementById(this.infoDiv);
  if (!!element) {
    if (connections) {
      element.style.color = 'green';
      element.innerHTML = connections + ' connection' + (connections > 1 ? 's' : '');
    }
    else {
      element.style.color = 'red';
      element.innerHTML = 'Waiting...';
    }
  }
};