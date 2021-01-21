const ws = require('ws');
const child_process = require('child_process');

const wsServer = new ws.Server({
  port: 4001,
});

const ffmpeg = child_process.spawn('ffmpeg', [
  '-i', 'rtsp://test:1234@192.168.1.32:554/videoMain',
  '-f', 'image2pipe',
  '-vf', 'fps=23',
  '-qscale:v', '1',
  '-',
], { detached: false });

ffmpeg.stdout.on('data', data => {
  wsServer.clients.forEach(client => {
    client.send(data, { binary: true });
  });
});

ffmpeg.stderr.on('data', data => {
  console.log(data.toString());
});

ffmpeg.on('error', e => {
  console.log(e);
});

wsServer.on('connection', () => {
  console.log('new connection');
});
