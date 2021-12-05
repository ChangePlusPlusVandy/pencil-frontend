import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const Field = ({ defaultValue, autoFocus, onBlur, onKeyPress }) => {
  const useFocus = () => {
    const htmlElRef = useRef(null);
    const setFocus = () => {
      if (htmlElRef.current) htmlElRef.current.focus();
    };

    return [htmlElRef, setFocus];
  };

  const [inputRef, setInputFocus] = useFocus();

  useEffect(() => {
    setInputFocus();
  }, [autoFocus]);

  return (
    <input
      type="text"
      ref={inputRef}
      defaultValue={defaultValue}
      onBlur={onBlur}
      onKeyPress={onKeyPress}
    />
  );
};

export default Field;

Field.propTypes = {
  defaultValue: PropTypes.string.isRequired,
  autoFocus: PropTypes.bool.isRequired,
  onBlur: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
};
