import _ from 'lodash';
import React from 'react';
import Player from './Player';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateContent } from '../redux/actions';
import './styles/map.css';

// constants
const playContentToggle = {
  splash: true,
  map: false
};

// render content
const Map = (props) => {
  if (!_.isEmpty(props.toggle) && !props.toggle.map)
    return null;

  return (
    <div className="map">
      <Player />
    </div>
  );
}

// redux options
Map.propTypes = {
  toggle: PropTypes.object.isRequired,
  changeScreen: PropTypes.func
};

const mapStateToProps = state => ({
  toggle: state.toggle
});

const mapDispatchToProps = dispatch => ({
  changeScreen: () => {
    dispatch(updateContent(playContentToggle));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
