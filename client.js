var net = require('net');
var PORT = 8080;
var socket = new net.Socket();

// Setting up the listener
socket.on('connect', function () {
    console.log('Connected to server on port ' + PORT);
    socket.write('\'cause I wonder where you are...');
});

// When connected...
socket.connect(PORT, function () {
  console.log('I am so connected.');
});