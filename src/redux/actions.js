import {
  CONTENT_TOGGLE,
  PLAYER_LOCATION
} from './actionTypes';

export const updateContent = (toggle) => ({
  type: CONTENT_TOGGLE,
  data: toggle
});

export const updatePlayerLocation = (player) => ({
  type: PLAYER_LOCATION,
  data: player
});
