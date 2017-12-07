import React from 'react';
import PropTypes from 'prop-types';
import './styles/hud.css';


const Hud = (props) => {
  if (props.data.alive === undefined)
    props.data.alive = true;
  return (
    <div>
      <div className="hud">
        <p>{props.data.id}</p>
        <hr />
        <ul>
          <li>Score <span className="right">{props.data.score}</span></li>
          { !props.data.reloading
            ? <li>Ammo <span className="right">{props.data.ammo}</span></li>
            : <li>Reloading...</li>
          }
        </ul>
      </div>
      { !props.data.alive
        ? <div className="wasted">Game Over<br /><br />Score: {props.data.score}</div>
        : null
      }
    </div>
  );
};

Hud.propTypes = {
  data: PropTypes.object.isRequired
};

export default Hud;

