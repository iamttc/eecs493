import React from 'react';
import PropTypes from 'prop-types';
import './styles/player.css';

const PALLET = [
  "#f44242", //red
  "#f442dc", //pink
  "#f47a42", //orange
  "#f4d942", //yellow
  "#5cf442", //green
  "#42caf4", //blue
  "#8d4ae6"  //purple
]
// background-color: #5cf442;
// box-shadow: 0 0 6px #5cf442;

const Player = (props) => {

  // position
  const style1 = {
    top: props.pos.top,
    left: props.pos.left,
  };

  // rotation
  const rotate = `rotate(${props.pos.rot}rad)`;
  const style2 = {
    msTransform: rotate,
    WebkitTransform: rotate,
    transform: rotate
  };

  // color
  var key = (props.playerId.length === 0) ? 0 : props.playerId.charCodeAt(0) % PALLET.length;
  const style3 = {
    backgroundColor: PALLET[key],
    boxShadow: `0 0 6px ${PALLET[key]}`
  }

  return (
    <div className="player" id={props.playerId} style={style1}>
      <div className="ship-wrapper" style={style2}>
        <div className="barrel"></div>
        <div className="ship" style={style3}></div>
      </div>
      <p className="name">{props.playerId}</p>
    </div>
  );
};

Player.propTypes = {
  playerId: PropTypes.string.isRequired,
  pos: PropTypes.object.isRequired
};

export default Player;

