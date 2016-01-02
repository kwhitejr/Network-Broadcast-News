var net = require('net');
var PORT = 8080;
var server = net.createServer(connectionListener);

function connectionListener (socket) {
  console.log('Client connected.');
  console.log(typeof(socket));

  socket.setEncoding('utf8');

  socket.on('data', function (data) {
    console.log(data);
  });
}

// server.on('connection', function (socket) {
//   console.log('\'cause I wonder where you are...');
// });

server.listen(PORT, function () {
  console.log('Hello... is it ' + PORT + ' you\'re looking for?');
});