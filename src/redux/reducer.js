import * as actionTypes from './actionTypes';

const initState = {
  toggle: {
    splash: true,
    map: false
  },
  me: {},
  players: {},
  bullets: [],
  asteroids: []
};

const Reducer = (state = initState, action) => {
  switch (action.type) {

    case actionTypes.MY_DATA:
      return { ...state, ...{ me: action.data } };

    case actionTypes.PLAYER_LOCATIONS:
      return { ...state, ...{ players: action.data } };

    case actionTypes.CONTENT_TOGGLE:
      return { ...state, ...{ toggle: action.data } };

    case actionTypes.BULLETS:
      return { ...state, ...{ bullets: action.data } };

    case actionTypes.ASTEROIDS:
      return { ...state, ...{ asteroids: action.data } };

    default:
      return state;
  }
}

export default Reducer;
