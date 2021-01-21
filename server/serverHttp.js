//Serveur HTTP

const http = require('http');
var fs = require('fs');

const hostname = '192.168.1.51';
const port = 3000;

const server = http.createServer((req, res) => {
  fs.readFile('../client/index.html', function(err, data) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
});
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
