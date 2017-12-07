var express = require('express');
var socketIo = require('socket.io');
var model = require('./backend/model');


/**
 * server stuff
 */
const PORT = process.env.PORT || 8080;
const INDEX = __dirname + '/public/index.html';
const server = express()
  .use((req, res) => {
    res.sendFile(INDEX)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));


/**
 * socket stuff
 */
const io = socketIo(server);
io.on('connection', (socket) => {
  // send asteroid locations
  io.emit('asteroid', model.asteroids);
  // get players
  socket.on('players', () => {
    socket.emit('players', Object.keys(model.players));
  });
  // update player location
  socket.on('pos', (data) => {
    model.addPlayer(data);
  });
  // new bullet from player
  socket.on('fire', (data) => {
    model.addBullet(data);
  });
  // remove player from game
  socket.on('kill', (data) => {
    model.killPlayer(data);
  });
  // dispatch data continuously
  setInterval(() => {
    io.emit('pos', model.players);
    io.emit('bullet', model.bullets);
  }, 32);
});
