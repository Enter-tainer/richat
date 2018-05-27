// Setup basic express server
var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(path.join(__dirname, 'dist')));

// Chatroom

var numUsers = 0;

io.on('connection', (socket) => {
  var addedUser = false;

  // when the client emits 'new message', this listens and executes
  socket.on('newMessage', (data) => {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('newMessage', {
      username: data.username,
      content: data.content,
      email: socket.email
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('addUser', (username, email) => {
    if (addedUser) return;

    // we store the username in the socket session for this client
    socket.username = username;
    socket.email = email
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('userJoined', {
      username: socket.username,
      email: socket.email,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', () => {
    socket.broadcast.emit('typing', {
      username: socket.username,
      email: socket.email
    });
  });

  // when the client emits 'stopTyping', we broadcast it to others
  socket.on('stopTyping', () => {
    socket.broadcast.emit('stopTyping', {
      username: socket.username,
      email: socket.email
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', () => {
    if (addedUser) {
      --numUsers;

      // echo globally that this client has left
      socket.broadcast.emit('userLeft', {
        username: socket.username,
        email: socket.email,
        numUsers: numUsers
      });
    }
  });
});
