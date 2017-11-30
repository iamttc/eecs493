import * as actionTypes from './actionTypes';
import { getAsteroids } from '../utils/utils';

const initState = {
  toggle: {
    splash: true,
    map: false
  },
  players: {},
  bullets: [],
  asteroids: getAsteroids()
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CONTENT_TOGGLE:
      return { ...state, ...{ toggle: action.data } };

    case actionTypes.PLAYER_LOCATION:
      const players = { ...state.players };
      players[action.data.playerId] = action.data.position;
      return { ...state, ...{ players } };

    case actionTypes.BULLETS:
      return { ...state, ...{ bullets: action.data } };

    default:
      return state;
  }
}

export default Reducer;
