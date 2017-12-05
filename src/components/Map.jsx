import _ from 'lodash';
import React from 'react';
import Player from './Player';
import Asteroid from './Asteroid';
import Bullet from './Bullet';
import Scores from './Scores';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/map.css';


// render content
const Map = (props) => {
  if (!_.isEmpty(props.toggle) && !props.toggle.map)
    return null;

  // get players
  const players = _.map(props.players, (position, playerId) => {
    return <Player key={playerId} playerId={playerId} position={position} />;
  });

  // get asteroids
  const asteroids = _.map(props.asteroids, (data, idx) => {
    return <Asteroid key={idx} position={data.position} rotation={data.rotation} dimension={data.dimension} polygon={data.polygon} />;
  });

  // get bullets
  const bullets = _.map(props.bullets, (data, idx) => {
    return <Bullet key={idx} playerId={data.playerId} position={data.position} />;
  });

  // return updated map
  return (
    <div className="map">
      <Scores players={props.players} />
      {asteroids}
      {players}
      {bullets}
    </div>
  );
};

// redux options
Map.propTypes = {
  toggle: PropTypes.object.isRequired,
  players: PropTypes.object.isRequired,
  asteroids: PropTypes.array.isRequired,
  bullets: PropTypes.array.isRequired,
  changeScreen: PropTypes.func
};

const mapStateToProps = state => ({
  toggle: state.toggle,
  players: state.players,
  asteroids: state.asteroids,
  bullets: state.bullets
});

export default connect(mapStateToProps, null)(Map);
