import React from 'react';
import PropTypes from 'prop-types';
import './styles/asteroid.css';

const Asteroid = (props) => {

  // position
  const rotate = `rotate(${props.rotation}rad)`;
  const style = {
    top: props.position.top,
    left: props.position.left,
    msTransform: rotate,
    WebkitTransform: rotate,
    transform: rotate,
    height: props.dimension.height,
    width: props.dimension.width
  };

  return (
    <div className="asteroid" style={style}></div>
  );
};

Asteroid.propTypes = {
  position: PropTypes.object.isRequired,
  dimension: PropTypes.object.isRequired,
  rotation: PropTypes.number.isRequired
};

export default Asteroid;

