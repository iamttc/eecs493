var _ = require('lodash');
const INTERVAL = 32;


/**
 * asteroids
 */
function getAsteroids() {
  const asteroids = [];
  for (var i = 0; i < 20; i++) {
    asteroids.push({
      pos: {
        top: Math.floor(Math.random() * (3000 - 500)),
        left: Math.floor(Math.random() * (3000 - 500))
      },
      dim: {
        height: Math.floor(Math.random()*80) + 260,
        width: Math.floor(Math.random()*80) + 260
      },
      rot: Math.random() * Math.PI * 2,
      poly: [
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

const checkNewPlayer = (id) => {
  if (players[ id ].s === undefined)
    players[ id ].s = 0;
};

const addPlayer = (player) => {
  players[ player.id ] = Object.assign({}, players[ player.id ], player.pos);
  checkNewPlayer(player.id);
};

const killPlayer = (player) => {
  delete players[ player.id ];
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
    _.each(players, (pos, id) => {
      if (bullet.id === id)
        return;

      var d = {
        x: bullet.left - pos.left,
        y: bullet.top - pos.top
      };
      var h = Math.sqrt(d.x * d.x + d.y * d.y);

      // kill and add score
      if (h < 30 && !_.isEmpty(players[ bullet.id ])) {
        players[ bullet.id ].s += 1;
        players[ id ].alive = false;
        return;
      }
    });
  });
}, INTERVAL);


/**
 * server logging
 */
setInterval(() => {
  console.log(players);
}, 3000);


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
