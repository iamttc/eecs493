import React from 'react';
import PropTypes from 'prop-types';
import './styles/bullet.css';


const Bullet = (props) => {

  const r = (props.data.d < 0) ? 100 : 6;

  const style = {
    top: props.data.top,
    left: props.data.left,
    width: r,
    height: r,
    borderRadius: r/2
  };

  return (
    <div className="bullet" style={style}></div>
  );
};

Bullet.propTypes = {
  data: PropTypes.object.isRequired
};

export default Bullet;

