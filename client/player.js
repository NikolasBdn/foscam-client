let isTouchDevice = 'ontouchstart' in document.documentElement;
let ip = "192.168.1.32:88";
console.log('touch : ' + isTouchDevice);

function send(url){
  axios.get(url)
  .then(function(i){console.log(i);})
}

$('#O').click(function(i){
  console.log('center');
  send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzReset&usr=nicolas&pwd=x6vA/L9b-Hz")
})

$('#ul').mousedown(function(i){
  if (isTouchDevice == false) {
    console.log('upLeft');
    send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzMoveTopLeft&usr=nicolas&pwd=x6vA/L9b-Hz")
  }
})

$('#ul').on('touchstart', function(i){
  console.log('up');
  send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzMoveTopLeft&usr=nicolas&pwd=x6vA/L9b-Hz")
})

$('#up').mousedown(function(i){
  if (isTouchDevice == false) {
    console.log('up');
    send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzMoveUp&usr=nicolas&pwd=x6vA/L9b-Hz")
  }
})

$('#up').on('touchstart', function(i){
  console.log('up');
  send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzMoveUp&usr=nicolas&pwd=x6vA/L9b-Hz")
})

$('#ur').mousedown(function(i){
  if (isTouchDevice == false) {
    console.log('upRight');
    send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzMoveTopRight&usr=nicolas&pwd=x6vA/L9b-Hz")
  }
})

$('#ur').on('touchstart', function(i){
  console.log('up');
  send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzMoveTopRight&usr=nicolas&pwd=x6vA/L9b-Hz")
})

$('#left').mousedown(function(i){
  if (isTouchDevice == false) {
    console.log('left');
    send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzMoveLeft&usr=nicolas&pwd=x6vA/L9b-Hz")
  }
})

$('#left').on('touchstart', function(i){
  console.log('left');
  send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzMoveLeft&usr=nicolas&pwd=x6vA/L9b-Hz")
})

$('#dl').mousedown(function(i){
  if (isTouchDevice == false) {
    console.log('down');
    send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzMoveBottomLeft&usr=nicolas&pwd=x6vA/L9b-Hz")
  }
})

$('#dl').on('touchstart', function(i){
  console.log('downLeft');
  send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzMoveBottomLeft&usr=nicolas&pwd=x6vA/L9b-Hz")
})
$('#down').mousedown(function(i){
  if (isTouchDevice == false) {
    console.log('down');
    send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzMoveDown&usr=nicolas&pwd=x6vA/L9b-Hz")
  }
})

$('#down').on('touchstart', function(i){
  console.log('down');
  send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzMoveDown&usr=nicolas&pwd=x6vA/L9b-Hz")
})

$('#dr').mousedown(function(i){
  if (isTouchDevice == false) {
    console.log('downRight');
    send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzMoveBottomRight&usr=nicolas&pwd=x6vA/L9b-Hz")
  }
})

$('#dr').on('touchstart', function(i){
  console.log('down');
  send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzMoveBottomRight&usr=nicolas&pwd=x6vA/L9b-Hz")
})

$('#right').mousedown(function(i){
  if (isTouchDevice == false) {
    console.log('right');
    send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzMoveRight&usr=nicolas&pwd=x6vA/L9b-Hz")
  }
})

$('#right').on('touchstart', function(i){
  console.log('right');
  send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzMoveRight&usr=nicolas&pwd=x6vA/L9b-Hz")
})

$('.arrow').mouseup(function(i){
  console.log('stop');
  send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzStopRun&usr=nicolas&pwd=x6vA/L9b-Hz")
})

$('.arrow').on('touchend', function(i){
  console.log('stop');
  send("http://" + ip + "/cgi-bin/CGIProxy.fcgi?cmd=ptzStopRun&usr=nicolas&pwd=x6vA/L9b-Hz")
})




//affichage
var fragments = [];
var frames = [];
var ws = new WebSocket('ws://192.168.1.50:4001');
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var reader = new FileReader();

ws.binaryType = 'arraybuffer';

ws.onmessage = function(data) {
  fragments.push(data.data);

  if (
    fragments.length > 2 &&
    data.data.byteLength !== fragments[fragments.length - 2].byteLength
  ) {
    draw();
    fragments = [];
  }
}

reader.onload = function(e) {
  var image = new Image();
  image.src = e.target.result;
  image.onload = function() {
    try {
      ctx.drawImage(image, 0, 0);
    } catch(e) {
      console.log('bad image');
    }
  }
}

function draw() {
  var bytes = fragments.map(function(f) { return new Uint8Array(f).buffer; });
  var blob = new Blob(bytes, { type: 'image/jpg' });

  frames.push(blob);
  try {
    reader.readAsDataURL(blob);
  } catch (e) {
    console.log('error');
  }
}
