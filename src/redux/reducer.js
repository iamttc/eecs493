import * as actionTypes from './actionTypes';

const initState = {
  toggle: {
    splash: true,
    map: false
  }
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CONTENT_TOGGLE:
      return { ...{ state }, ...{ toggle: action.data } };
    default:
      return state;
  }
}

export default Reducer;
