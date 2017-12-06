import React from 'react';
import PropTypes from 'prop-types';
import './styles/bullet.css';


const Bullet = (props) => {
  const style = {
    top: props.data.top,
    left: props.data.left
  };

  return (
    <div className="bullet" style={style}></div>
  );
};

Bullet.propTypes = {
  data: PropTypes.object.isRequired
};

export default Bullet;

