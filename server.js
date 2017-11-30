var express = require('express');
var socketIo = require('socket.io');
var _ = require('lodash');
var data = require('./backend/utils');


/**
 * server stuff
 */
const PORT = process.env.PORT || 8000;
const INDEX = __dirname + '/public/index.html';
const INTERVAL = 100;

const server = express()
  .use((req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


/**
 * socket stuff
 */
const io = socketIo(server);
io.on('connection', (socket) => {
  // send asteroid locations
  io.emit('asteroids', data.asteroids);
  // update player location
  socket.on('update location', (data) => {
    io.emit('update location', data);
  });
  // new bullet from player
  socket.on('fire bullet', (data) => {
    data.bullets.push(data);
  });
  // dispatch bullet locations
  setInterval(() => {
    io.emit('bullet locations', data.bullets);
  }, INTERVAL);
});


/**
 * variable updating
 */
const updateBullets = () => {
  _.map(data.bullets, (bullet) => {
    return bullet;
  });
};
setInterval(updateBullets, INTERVAL);
