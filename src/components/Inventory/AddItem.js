/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import './AddItem.css';

const AddItem = ({ setVisible, setData, data }) => {
  const [name, setName] = useState('');
  const [limit, setLimit] = useState(0);

  const setVisibleOff = () => {
    setVisible(false);
  };

  const handleParent = () => {
    setVisibleOff();
  };

  const handleChild = (event) => {
    event.stopPropagation();
  };

  const handleSubmit = () => {
    setData([...data, { itemName: name, itemLimit: limit }]);
    setVisibleOff();
  };

  return (
    <div className="addItemOverlay" onClick={handleParent}>
      <div className="addItemInner" onClick={handleChild}>
        <div className="addItemInput">
          <div>Item Name</div>
          <input
            type="text"
            id="itemName"
            name="itemName"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="addItemInput">
          <div>Item Limit</div>
          <input
            type="number"
            id="itemLimit"
            name="itemLimit"
            onChange={(event) => setLimit(event.target.value)}
          />
        </div>
        <div className="inventoryButton" onClick={setVisibleOff}>
          Cancel
        </div>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddItem;
