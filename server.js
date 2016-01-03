var net = require('net');
var fs = require('fs');
var PORT = 8080;
var server = net.createServer(connectionListener);
var idCounter = 0;
var connectedUsers = [];

// this is all a 'server.on('connection')' event
function connectionListener (socket) {
  socket.setEncoding('utf8');

  console.log(socket.remotePort + ' is connected.');
  server.getConnections(function (err, count) {
    console.log("There are now this many connections: ", count);
  });

  //assign connected user to object
  connectedUsers.push(socket);

  // What to do with data received. Socket stream is R/W
  socket.on('data', function (data) {
    // data received from client (process.stdin) is written (stdout) to server
    process.stdout.write(data);
    // same data is distributed to each other client ('client' is a socket)
    connectedUsers.forEach(function(client) {
      client.write(data);
    });
  });


  // delete user from connected user object on socket close
  socket.on('close', function (socket) {
    connectedUsers.splice(connectedUsers.indexOf(socket), 1);
    connectedUsers.forEach(function (user) {
      console.log(user._peername.port);
    });
  });
}

// server.on('connection', function (socket) {
//   console.log('\'cause I wonder where you are...');
// });

// Function that will pipe input to server.
process.stdin.on('data', function (data) {
  connectedUsers.forEach(function(client) {
    client.write('[ADMIN]: ' + data);
  });
});

server.listen(PORT, function () {
  console.log('Hello... is it ' + PORT + ' you\'re looking for?');
});