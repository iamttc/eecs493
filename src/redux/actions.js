import {
  CONTENT_TOGGLE,
  PLAYER_LOCATION,
  BULLETS,
  ASTEROIDS
} from './actionTypes';

export const updateContent = (toggle) => ({
  type: CONTENT_TOGGLE,
  data: toggle
});

export const updatePlayerLocations = (players) => ({
  type: PLAYER_LOCATION,
  data: players
});

export const updateBullets = (bullets) => ({
  type: BULLETS,
  data: bullets
});

export const updateAsteroids = (asteroids) => ({
  type: ASTEROIDS,
  data: asteroids
});
