/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './InventoryToggle.css';

const InventoryToggle = ({ onChange }) => {
  const [selected, setSelected] = useState('Active');

  const handleClick = (value) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="inventory-toggle">
      <div
        className={`inventory-toggle-item toggle-item-left toggle-item-${
          selected === 'Active' ? 'active' : 'inactive'
        }`}
        onClick={() => handleClick('Active')}
      >
        Active
      </div>
      <div
        className={`inventory-toggle-item toggle-item-right toggle-item-${
          selected === 'Master' ? 'active' : 'inactive'
        }`}
        onClick={() => handleClick('Master')}
      >
        Master
      </div>
    </div>
  );
};

InventoryToggle.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default InventoryToggle;
