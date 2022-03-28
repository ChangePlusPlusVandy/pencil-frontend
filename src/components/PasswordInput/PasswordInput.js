import React, { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import PropTypes from 'prop-types';
import './PasswordInput.css';

const PasswordInput = ({ value, onChange, disabled, className }) => {
  const [passwordType, setPasswordType] = useState('password');

  const toggleType = () => {
    if (passwordType === 'password') setPasswordType('text');
    else setPasswordType('password');
  };

  return (
    <div className="passwordInputContainer">
      <input
        className={className}
        type={passwordType}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      {passwordType === 'password' ? (
        <AiFillEyeInvisible
          size="20"
          className="passwordToggleIcon hidden"
          onClick={toggleType}
          hidden={disabled}
        />
      ) : (
        <AiFillEye
          size="20"
          className="passwordToggleIcon showing"
          onClick={toggleType}
          hidden={disabled}
        />
      )}
    </div>
  );
};

export default PasswordInput;

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

PasswordInput.defaultProps = {
  disabled: false,
  className: 'passwordInput',
};
