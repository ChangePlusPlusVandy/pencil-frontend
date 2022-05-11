import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './InventoryToggle.css';

const InventoryToggle = ({ onChange }) => {
  const [selected, setSelected] = useState('Active');

  // Changes view of inventory
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
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
      >
        Active
      </div>
      <div
        className={`inventory-toggle-item toggle-item-right toggle-item-${
          selected === 'Master' ? 'active' : 'inactive'
        }`}
        onClick={() => handleClick('Master')}
        onKeyDown={() => {}}
        role="button"
        tabIndex={0}
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
