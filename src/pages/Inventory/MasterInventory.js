import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getMasterInv } from './api-inventory';
import { useAuth } from '../../AuthContext';
import './MasterInventory.css';

const MasterInventory = ({ data, setData }) => {
  const { currentLocation } = useAuth();

  useEffect(() => {
    getMasterInv(currentLocation).then((result) => {
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
};

export default MasterInventory;
