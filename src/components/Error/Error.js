import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import './Error.css';

const Error = ({ error, description, setError }) => (
  <Alert
    className="error"
    message={error}
    description={
      description ||
      'Please contact the development team if this issue persists.'
    }
    type="error"
    showIcon
    closable
    onClose={() => setError(null)}
  />
);

export default Error;

Error.propTypes = {
  error: PropTypes.string.isRequired,
  description: PropTypes.string,
  setError: PropTypes.func.isRequired,
};

Error.defaultProps = {
  description: null,
};
