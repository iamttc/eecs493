var _ = require('lodash');
const INTERVAL = 32;


/**
 * asteroids
 */
function getAsteroids() {
  const asteroids = [];
  for (var i = 0; i < 20; i++) {
    asteroids.push({
      position: {
        top: Math.floor(Math.random() * (3000 - 500)),
        left: Math.floor(Math.random() * (3000 - 500))
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

const asteroids = getAsteroids();


/**
 * players
 */
var players = {};

const checkNewPlayer = (playerId) => {
  if (players[playerId].score === undefined)
    players[playerId].score = 0;
};

const addPlayer = (player) => {
  players[player.playerId] = Object.assign({}, players[player.playerId], player.position);
  checkNewPlayer(player.playerId);
};

const killPlayer = (player) => {
  delete players[player.playerId];
};


/**
 * update bullets
 */
var bullets = [];

const addBullet = (bullet) => {
  bullets.push(bullet);
};

setInterval(() => {
  _.each(bullets, (bullet) => {
    var d = {
      x: bullet.position.left - bullet.position.init_x,
      y: bullet.position.top  - bullet.position.init_y
    };
    var h = Math.sqrt(d.x * d.x + d.y * d.y);
    // move off screen
    if (h > 480) {
      bullet.position.top = -100;
      bullet.position.left = -100;
      return bullet;
    }
    // set top and left to new coordinates
    else {
      var a = bullet.position.direction + Math.PI/2;
      bullet.position.left = (-12) * Math.cos(a) + bullet.position.left;
      bullet.position.top = (-12) * Math.sin(a) + bullet.position.top;
      return bullet;
    }
  });
  _.remove(bullets, (bullet) => {
    return bullet.position.top < 0 && bullet.position.left < 0;
  });
}, INTERVAL);


/**
 * check for collisions
 */
setInterval(() => {
  _.each(bullets, (bullet) => {
    _.each(players, (position, playerId) => {
      if (bullet.playerId === playerId)
        return;
      var d = {
        x: bullet.position.left - position.left,
        y: bullet.position.top  - position.top
      };
      var h = Math.sqrt(d.x * d.x + d.y * d.y);

      // kill and add score
      if (h < 30 && !_.isEmpty(players[bullet.playerId])) {
        players[bullet.playerId].score += 1;
        players[playerId].alive = false;
        return;
      }
    });
  });
}, INTERVAL);


/**
 * export
 */
module.exports = {
  asteroids: asteroids,

  players: players,
  addPlayer: addPlayer,
  killPlayer: killPlayer,

  bullets: bullets,
  addBullet: addBullet
};
