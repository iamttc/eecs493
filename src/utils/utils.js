const NUM_ASTEROIDS = 50;

export function getAsteroids() {
  const asteroids = [];
  for (var i = 0; i < NUM_ASTEROIDS; i++) {
    asteroids.push({
      position: {
        top: Math.floor(Math.random() * (5000 - 500)),
        left: Math.floor(Math.random() * (5000 - 500))
      },
      rotation: Math.floor(Math.random() * 360)
    });
  }
  return asteroids;
}
