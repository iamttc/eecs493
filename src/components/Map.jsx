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
  props.players[ props.me.id ] = { ...props.players[ props.me.id ], ...props.me.pos };
  const players = _.map(props.players, (pos, playerId) => {
    return <Player key={playerId} playerId={playerId} pos={pos} />;
  });

  // get asteroids
  const asteroids = _.map(props.asteroids, (data, idx) => {
    return <Asteroid key={idx} data={data} />;
  });

  // get bullets
  const bullets = _.map(props.bullets, (data, idx) => {
    return <Bullet key={idx} data={data} />;
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
  me: PropTypes.object.isRequired,
  players: PropTypes.object.isRequired,
  asteroids: PropTypes.array.isRequired,
  bullets: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  toggle: state.toggle,
  me: state.me,
  players: state.players,
  asteroids: state.asteroids,
  bullets: state.bullets
});

export default connect(mapStateToProps, null)(Map);
