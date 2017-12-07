import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/error.css';


const Error = (props) => {
  if (_.isEmpty(props.error))
    return null;
  return <div className="error">{props.error}</div>;
};

Error.propTypes = {
  error: PropTypes.string
};

const mapStateToProps = state => ({
  error: state.error,
});

export default connect(mapStateToProps, null)(Error);

