import React from 'react';
import PropTypes from 'prop-types';
import './styles/asteroid.css';

const Asteroid = (props) => {

  // internal data
  const pos = props.data.pos;
  const dim = props.data.dim;
  const rot = props.data.rot;
  const poly = props.data.poly;

  // position
  const rotate = `rotate(${rot}rad)`;
  const polygon =`polygon(
    ${50 + poly[0]}% ${0 + poly[1]}%, 
    ${90 + poly[2]}% ${20 + poly[3]}%, 
    ${100 + poly[4]}% ${60 + poly[5]}%, 
    ${75 + poly[6]}% ${100 + poly[7]}%, 
    ${25 + poly[8]}% ${100 + poly[9]}%, 
    ${0 + poly[10]}% ${60 + poly[11]}%, 
    ${10 + poly[12]}% ${20 + poly[13]}%
  )`;
  const style = {
    top: pos.top,
    left: pos.left,
    msTransform: rotate,
    WebkitTransform: rotate,
    transform: rotate,
    height: dim.height,
    width: dim.width,
    clipPath: polygon,
    WebkitClipPath: polygon
  };

  return (
    <div className="asteroid" style={style}></div>
  );
};

Asteroid.propTypes = {
  data: PropTypes.object.isRequired
};

export default Asteroid;

