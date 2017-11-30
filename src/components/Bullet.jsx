import React from 'react';
import PropTypes from 'prop-types';
import './styles/bullet.css';


const Bullet = (props) => {
  const style = {
    top: props.position.top,
    left: props.position.left
  };

  return (
    <div className="bullet" style={style}></div>
  );
};

Bullet.propTypes = {
  playerId: PropTypes.string.isRequired,
  position: PropTypes.object.isRequired
};

export default Bullet;

