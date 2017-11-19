import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlayerService from '../services/playerService';
import '../services/splashService';
import './styles/splash.css';

// render content
const Splash = (props) => {
  if (!_.isEmpty(props.toggle) && !props.toggle.splash)
    return null;

  return (
    <div className="splash">
      <input type="text" className="name input" placeholder="Name" />
      <button className="input" onClick={() => props.initPlayer()}>Play</button>
      <div className="instructions">
        [Up/Down] to move<br/>
        [Left/Right] to spin<br/>
        [Space] to shoot.
      </div>
    </div>
  );
};

// redux options
Splash.propTypes = {
  toggle: PropTypes.object.isRequired,
  initPlayer: PropTypes.func
};

const mapStateToProps = state => ({
  toggle: state.toggle
});

const mapDispatchToProps = dispatch => ({
  initPlayer: () => {
    dispatch(PlayerService.initPlayerService());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);