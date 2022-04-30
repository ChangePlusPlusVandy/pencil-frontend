import React from 'react';
import PropTypes from 'prop-types';
import { IoWarningOutline } from 'react-icons/io5';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './Errors.css';

// eslint-disable-next-line arrow-body-style
const Errors = ({ error, handleError }) => {
  return (
    <div className="error">
      <IoWarningOutline size={60} />
      <div className="errorMsg">Error Message : {error}</div>
      <AiOutlineCloseCircle
        size={20}
        onClick={handleError}
        className="errorClose"
      />
    </div>
  );
};

export default Errors;

Errors.propTypes = {
  error: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
};
