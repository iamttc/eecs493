import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateContent } from '../redux/actions';
import '../services/splashService';

// constants
const playContentToggle = {
  splash: false,
  map: true
};

// render content
const Splash = (props) => {
  if (!_.isEmpty(props.toggle) && !props.toggle.splash)
    return null;

  return (
    <div className="splash">
      <h1>Space Fighters</h1>
      <input type="text" placeholder="your name"/>
      <button onClick={() => props.changeScreen()}>Play</button>
    </div>
  );
};

// redux options
Splash.propTypes = {
  toggle: PropTypes.object.isRequired,
  changeScreen: PropTypes.func
};

const mapStateToProps = state => ({
  toggle: state.toggle
});

const mapDispatchToProps = dispatch => ({
  changeScreen: () => {
    dispatch(updateContent(playContentToggle));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
