var _ = require('lodash');
const INTERVAL = 100;


/**
 * players
 */
var players = {};

/**
 * asteroids
 */
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
const asteroids = getAsteroids();


/**
 * bullets
 */
var bullets = [];
const updateBullets = () => {
  _.map(bullets, (bullet) => {
    if(bullet.position.top < 0 && bullet.position.left < 0)
      return null;
    var d = {
      x: bullet.position.left - bullet.position.init_x,
      y: bullet.position.top  - bullet.position.init_y
    };
    var h = Math.sqrt(d.x * d.x + d.y * d.y);
    if(h > 480){
      bullet.position.top = -100;
      bullet.position.left = -100;
      return bullet
    }
    // set top and left to new coordinates
    var a = bullet.position.direction + Math.PI/2;
    bullet.position.left = (-12) * Math.cos(a) + bullet.position.left;
    bullet.position.top = (-12) * Math.sin(a) + bullet.position.top;

    return bullet;
  });
  _.reduce(bullets, (bullet) => {
    return !_.isEmpty(bullet);
  });
};
const addBullet = (bullet) => {
  bullets.push(bullet);
};
setInterval(updateBullets, INTERVAL);

/**
 * export
 */
module.exports = {
  players: players,
  asteroids: asteroids,
  bullets: bullets,
  addBullet: addBullet
};
