import React from 'react';
import PropTypes from 'prop-types';
import './styles/player.css';


const Player = (props) => {

  const style = {
    top: props.position.top,
    left: props.position.left
  };

  return (
    <div className="player" id={props.playerId} style={style}>
      <p className="name">{props.playerId}</p>
    </div>
  );
};

Player.propTypes = {
  playerId: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired
};

export default Player;

