import _ from 'lodash';
import React from 'react';
import Player from './Player';
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

  // return updated map
  return (
    <div className="map">
      {players}
    </div>
  );
}

// redux options
Map.propTypes = {
  toggle: PropTypes.object.isRequired,
  players: PropTypes.object.isRequired,
  changeScreen: PropTypes.func
};

const mapStateToProps = state => ({
  toggle: state.toggle,
  players: state.players
});

export default connect(mapStateToProps, null)(Map);
