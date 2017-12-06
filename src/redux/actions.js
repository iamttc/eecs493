import {
  CONTENT_TOGGLE,
  PLAYER_LOCATIONS,
  MY_LOCATION,
  BULLETS,
  ASTEROIDS
} from './actionTypes';

export const updateContent = (toggle) => ({
  type: CONTENT_TOGGLE,
  data: toggle
});

export const updatePlayerLocations = (players) => ({
  type: PLAYER_LOCATIONS,
  data: players
});

export const updateMyLocation = (player) => ({
  type: MY_LOCATION,
  data: player
});

export const updateBullets = (bullets) => ({
  type: BULLETS,
  data: bullets
});

export const updateAsteroids = (asteroids) => ({
  type: ASTEROIDS,
  data: asteroids
});
