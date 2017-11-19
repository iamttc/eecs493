import React from 'react';
import PropTypes from 'prop-types';
import './styles/player.css';


const Player = (props) => {

  // position
  const style1 = {
    top: props.position.top,
    left: props.position.left,
  };

  // rotation
  const rotate = `rotate(${props.position.rotation}rad)`;
  const style2 = {
    // '-ms-transform': rotate,
    // '-webkit-transform': rotate,
    transform: rotate
  };

  return (
    <div className="player" id={props.playerId} style={style1}>
      <div className="ship-wrapper" style={style2}>
        <div className="barrel"></div>
        <div className="ship"></div>
      </div>
      <p className="name">{props.playerId}</p>
    </div>
  );
};

Player.propTypes = {
  playerId: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired
};

export default Player;

