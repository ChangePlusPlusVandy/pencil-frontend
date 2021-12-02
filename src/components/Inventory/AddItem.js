/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './AddItem.css';

const AddItem = ({ setVisible }) => {
  const setVisibleOff = () => {
    setVisible(false);
  };

  return (
    <div className="addItemOverlay" onClick={setVisibleOff}>
      <div className="addItemInner">
        <div className="addItemInput">
          <div>Item Name</div>
          <input type="text" id="itemName" name="itemName" />
        </div>
        <div className="addItemInput">
          <div>Item Limit</div>
          <input type="text" id="itemLimit" name="itemLimit" />
        </div>
        <div className="inventoryButton" onClick={setVisibleOff}>
          Cancel
        </div>
        <button type="button">Submit</button>
      </div>
    </div>
  );
};

export default AddItem;
