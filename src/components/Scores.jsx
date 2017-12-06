import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import './styles/scores.css';


// render content
const HighScores = (props) => {

  let scores = _.map(props.players, (data, playerId) => {
    return {
      playerId: playerId,
      score: data.s
    };
  });
  scores = _.orderBy(scores, 'score', 'desc');
  scores = _.map(scores, (data) => {
    return <li key={`score-${data.playerId}`}>{data.playerId} <span className="right">{data.score}</span></li>;
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
