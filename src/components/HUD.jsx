import React from 'react';
import PropTypes from 'prop-types';
import './styles/hud.css';


const Hud = (props) => {
  return (
    <div className="hud">
      <p>{props.data.id}</p>
      <hr />
      <ul>
        { !props.data.reloading
          ? <li>Ammo <span className="right">{props.data.ammo}</span></li>
          : <li>Reloading...</li>
        }
      </ul>
    </div>
  );
};

Hud.propTypes = {
  data: PropTypes.object.isRequired
};

export default Hud;

