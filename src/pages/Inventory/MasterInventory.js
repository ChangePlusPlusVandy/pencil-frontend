import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMasterInv } from './api-inventory';
import './MasterInventory.css';

const MasterInventory = ({ data, setData, setChanged }) => {
  useEffect(() => {
    getMasterInv().then((result) => {
      if (result instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(
          'Something went wrong in the backend server. Please contact the developer team'
        );
        console.log(result);
      } else {
        setData(result);
      }
    });
  }, []);

  // TODO: Add delete icon to row and attach this function
  const handleDelete = (name) => {
    const newData = data.filter((item) => item.itemName !== name);
    setData([]);
    setData(newData);
    setChanged(true);
  };

  // TODO: Replace text with EditableText and attach this function
  const handleItemChange = (item) => {
    setChanged(true);
    setData(item);
  };

  return (
    <div>
      <div className="containerHeader">
        <div className="headerName">Item Name</div>
        <div className="headerItemLimit">Item Price </div>
      </div>
      <ul className="master-inventory-list">
        {data.map((item, index) => (
          <div className="master-inventory-item">
            <div className="itemOrder">{index + 1}</div>
            <div id="master-inventory-name">{item.itemName}</div>
            <div id="master-inventory-price">{item.itemPrice}</div>
          </div>
        ))}
      </ul>
    </div>
  );
};

MasterInventory.propTypes = {
  data: PropTypes.arrayOf.isRequired,
  setData: PropTypes.func.isRequired,
  setChanged: PropTypes.func.isRequired,
};

export default MasterInventory;
