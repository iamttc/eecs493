import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/splash.css';

// render content
const Splash = (props) => {
  if (!_.isEmpty(props.toggle) && !props.toggle.splash)
    return null;

  // get player name if there is one
  const id = props.playerService.getName();

  return (
    <div className="splash">
      <input
        type="text"
        className="name input"
        placeholder="Name"
        defaultValue={id}
        onKeyDown={(e) => props.checkSubmit(props, e)}
      />
      <button className="input" onClick={() => props.init(props)}>Play</button>
      <div className="instructions">
        [W/A/S/D] to move<br/>
        Click to shoot
      </div>
    </div>
  );
};

// redux options
Splash.propTypes = {
  toggle: PropTypes.object.isRequired,
  init: PropTypes.func.isRequired,
  checkSubmit: PropTypes.func.isRequired,
  bulletService: PropTypes.object.isRequired,
  playerService: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  toggle: state.toggle
});

const mapDispatchToProps = dispatch => ({
  init: (props) => {
    dispatch(props.playerService.startService());
    dispatch(props.bulletService.startService());
  },
  checkSubmit: (props, event) => {
    if(event && event.keyCode === 13){
      props.init(props);
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
