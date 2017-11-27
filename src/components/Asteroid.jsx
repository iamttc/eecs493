import React from 'react';
import PropTypes from 'prop-types';
import './styles/asteroid.css';

const Asteroid = (props) => {

  // position
  const rotate = `rotate(${props.rotation}rad)`;
  const polygon =`polygon(
    ${50 + props.polygon[0]}% ${0 + props.polygon[1]}%, 
    ${90 + props.polygon[2]}% ${20 + props.polygon[3]}%, 
    ${100 + props.polygon[4]}% ${60 + props.polygon[5]}%, 
    ${75 + props.polygon[6]}% ${100 + props.polygon[7]}%, 
    ${25 + props.polygon[8]}% ${100 + props.polygon[9]}%, 
    ${0 + props.polygon[10]}% ${60 + props.polygon[11]}%, 
    ${10 + props.polygon[12]}% ${20 + props.polygon[13]}%
  )`;
  const style = {
    top: props.position.top,
    left: props.position.left,
    msTransform: rotate,
    WebkitTransform: rotate,
    transform: rotate,
    height: props.dimension.height,
    width: props.dimension.width,
    clipPath: polygon,
    WebkitClipPath: polygon
  };

  return (
    <div className="asteroid" style={style}></div>
  );
};

Asteroid.propTypes = {
  position: PropTypes.object.isRequired,
  dimension: PropTypes.object.isRequired,
  rotation: PropTypes.number.isRequired,
  polygon: PropTypes.array.isRequired
};

export default Asteroid;

