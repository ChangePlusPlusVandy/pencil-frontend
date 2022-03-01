import React from 'react';
import PropTypes from 'prop-types';

const Errors = ({ errorStr }) => <text>{errorStr}</text>;

export default Errors;

Errors.propTypes = {
  errorStr: PropTypes.string.isRequired,
};
