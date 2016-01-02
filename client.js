var net = require('net');
var PORT = 8080;
var socket = new net.Socket();

socket.on('connect', function () {
    console.log('Connected to server on port ' + PORT);
    socket.write('\'cause I wonder where you are...');
});

socket.connect(PORT, function () {
});