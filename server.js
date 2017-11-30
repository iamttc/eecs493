var express = require('express');
var socketIo = require('socket.io');
var _ = require('lodash');

// constants
const PORT = process.env.PORT || 8000;
const INDEX = __dirname + '/public/index.html';
const INTERVAL = 100;

// create server and listen
const server = express()
  .use((req, res) => res.sendFile(INDEX))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// init socket.io
const io = socketIo(server);


// players
var players = {};

// asteroids
const asteroids = getAsteroids();

// bullets
var bullets = [];
const updateBullets = () => {
  _.map(bullets, (bullet) => {
    var d = {
      x: bullet.position.left - bullet.position.init_x,
      y: bullet.position.top  - bullet.position.init_y
    };
    var h = Math.sqrt(d.x * d.x + d.y * d.y);
    if(h > 480)
      return null;
      
    // set top and left to new coordinates
    var a = bullet.position.direction + Math.PI/2;
    bullet.position.left = (-32) * Math.cos(a) + bullet.position.left;
    bullet.position.top = (-32) * Math.sin(a) + bullet.position.top;

    return bullet;
  });
  _.reduce(bullets, (bullet) => {
    return !_.isEmpty(bullet);
  });
};
setInterval(updateBullets, INTERVAL);




// listen for socket connections
io.on('connection', (socket) => {

  // send asteroid locations
  io.emit('asteroids', asteroids);

  // update player location
  socket.on('update location', (data) => {
    io.emit('update location', data);
  });

  // new bullet from player
  socket.on('fire bullet', (data) => {
    bullets.push(data);
  });

  // dispatch bullet locations
  setInterval(() => {
    io.emit('bullet locations', bullets);
  }, INTERVAL);
});


// get randomly places asteroids
function getAsteroids() {
  const asteroids = [];
  for (var i = 0; i < 50; i++) {
    asteroids.push({
      position: {
        top: Math.floor(Math.random() * (5000 - 500)),
        left: Math.floor(Math.random() * (5000 - 500))
      },
      dimension: {
        height: Math.floor(Math.random()*80) + 260,
        width: Math.floor(Math.random()*80) + 260
      },
      rotation: Math.random() * Math.PI * 2,
      polygon: [
        Math.floor(Math.random()*20)-10,
        Math.floor(Math.random()*20)-10,
        Math.floor(Math.random()*20)-10,
        Math.floor(Math.random()*20)-10,
        Math.floor(Math.random()*20)-10,
        Math.floor(Math.random()*20)-10,
        Math.floor(Math.random()*20)-10,
        Math.floor(Math.random()*20)-10,
        Math.floor(Math.random()*20)-10,
        Math.floor(Math.random()*20)-10,
        Math.floor(Math.random()*20)-10,
        Math.floor(Math.random()*20)-10,
        Math.floor(Math.random()*20)-10,
        Math.floor(Math.random()*20)-10
      ]
    });
  }
  return asteroids;
}