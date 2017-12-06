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
    // move off screen
    if (bullet.d > 480) {
      bullet.top = -100;
      bullet.left = -100;
      return bullet;
    }
    // set top and left to new coordinates
    else {
      var a = bullet.rot + Math.PI/2;
      bullet.left = (-12) * Math.cos(a) + bullet.left;
      bullet.top = (-12) * Math.sin(a) + bullet.top;
      bullet.d += 12;
      return bullet;
    }
  });
  _.remove(bullets, (bullet) => {
    return bullet.top < 0 && bullet.left < 0;
  });
}, INTERVAL);


/**
 * check for collisions
 */
setInterval(() => {
  _.each(bullets, (bullet) => {
    _.each(players, (pos, playerId) => {
      if (bullet.id === playerId)
        return;

      var d = {
        x: bullet.left - pos.left,
        y: bullet.top - pos.top
      };
      var h = Math.sqrt(d.x * d.x + d.y * d.y);

      // kill and add score
      if (h < 30 && !_.isEmpty(players[ bullet.id ])) {
        players[ bullet.id ].score += 1;
        players[ playerId ].alive = false;
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
