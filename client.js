var net = require('net');
var PORT = 8080;
var socket = new net.Socket();
var fs = require('fs');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
var username = '';
socket.setEncoding('utf8');

var invalidUsernames = ['[ADMIN]', 'ADMIN'];

getUsername();

// STEP 1
function getUsername () {
  rl.question('Enter a username: ', function (answer) {
    if (invalidUsernames.indexOf(answer) > -1) {
      console.log('Invalid username... try again...');
      getUsername();
    // Need 'else' statement to prevent fuckery on unwinding.
    } else {
      console.log('Thank you, ', answer);
      username += answer;
      rl.close();
      // Readline is weird. Avoid it.
      process.stdin.resume();
      connectToServer();
    }
  });
}

// STEP 2
function connectToServer () {
  // Setting up the listener
  socket.on('connect', function () {
    // Client-side local port will be server-side remote port.
    console.log('Connected to server on port ' + PORT);
  });

  // When connected...
  socket.connect(PORT, function () {
    console.log('Welcome, ' + username + ', you are ready to write. Your remote port is ' + socket.localPort);

    // Function that will pipe input to server.
    process.stdin.on('data', function (data) {
      socket.write(username + ': ' + data);
    });

    // What to do on receipt of data.
    socket.on('data', function (data) {
      process.stdout.write(data);
    });
  });
}