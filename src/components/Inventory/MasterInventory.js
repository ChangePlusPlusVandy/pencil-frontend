import React, { useState, Component, useEffect } from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import { getMasterInv } from './api-inventory';

const MasterInventory = () => {
  const [scheduleData, setScheduleData] = useState([]);

  // TEMP: Dummy data for schedule
  useEffect(() => {
    getMasterInv().then((result) => {
      if (result instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(
          'Something went wrong in the backend server. Please contact the developer team'
        );
        console.log(result);
      } else {
        setScheduleData(result);
      }
    });
  }, []);

  const handleDropdown = () => {
    // handle dropdown between 'upcoming', ''
  };

  return (
    <div className="inventoryContainer">
      <div className="masterInventoryHeader">
        <h2>Number of items ({2})</h2>
        <span>Item</span>
        <span>Item Price</span>
      </div>
      <div className="itemContainer">
        <ul className="scheduleList">
          {scheduleData.map((item, index) => {
            console.log('THIS IS THE DATA ', item);
            // const createdAt = new Date(item.created_at);
            const { itemName } = item;
            const { itemPrice } = item;
            return (
              <div className="scheduleItem">
                <div>{itemName}</div>
                <div>{itemPrice}</div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MasterInventory;
