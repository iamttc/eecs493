var express = require('express');
var socketIo = require('socket.io');
var model = require('./backend/model');


/**
 * server stuff
 */
const PORT = process.env.PORT || 8000;
const INDEX = __dirname + '/public/index.html';
const server = express()
  .use((req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


/**
 * socket stuff
 */
const io = socketIo(server);
io.on('connection', (socket) => {
  // send asteroid locations
  io.emit('asteroids', model.asteroids);
  // update player location
  socket.on('update location', (data) => {
    model.addPlayer(data);
  });
  // new bullet from player
  socket.on('fire bullet', (data) => {
    model.addBullet(data);
  });
  // dispatch data continuously
  setInterval(() => {
    io.emit('player locations', model.players);
    io.emit('bullet locations', model.bullets);
  }, 50);
});
