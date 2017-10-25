var express = require('express');
var socketIo = require('socket.io');

// constants
const PORT = process.env.PORT || 8000;
const INDEX = __dirname + '/public/index.html';

// create server and listen
const server = express()
  .use((req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// init socket.io
const io = socketIo(server);

// listen for socket connections
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
  socket.on('game action', (data) => {
    io.emit('game action', data);
  });
});
