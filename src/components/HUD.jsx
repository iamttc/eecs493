import React from 'react';
import PropTypes from 'prop-types';
import './styles/hud.css';


const Hud = (props) => {

  return (
    <div className="hud">
      <p>{props.data.id}</p>
      <hr />
      <ul>
        <li>ammo <span className="right">{props.data.ammo}</span></li>
      </ul>
    </div>
  );
};

Hud.propTypes = {
  data: PropTypes.object.isRequired
};

export default Hud;

