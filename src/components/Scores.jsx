import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import './styles/scores.css';


// render content
const HighScores = (props) => {

  // get players
  const scores = _.map(props.players, (data, playerId) => {
    return <li key={`score-${playerId}`}>{playerId} <span className="right">{data.score}</span></li>;
  });

  // return updated map
  return (
    <div className="scores">
      <p>Scores</p>
      <hr />
      <ol>{scores}</ol>
    </div>
  );
};

// redux options
HighScores.propTypes = {
  players: PropTypes.object.isRequired,
};

export default HighScores;
