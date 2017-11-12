import React from 'react';
import '../services/splashService';
import './styles/splash.css';



const Splash = () => {
  return (
    <div className="splash">
      <input type="text" className="name input" placeholder="Name"/>
      <button className="input">Play</button>
      <div className="instructions">[Up/Down] to move<br/>[Left/Right] to spin<br/>[Space] to shoot.</div>
    </div>
  );
}

export default Splash;
