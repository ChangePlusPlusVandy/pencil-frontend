/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineEdit } from 'react-icons/ai';
import { getMasterInv } from './api-inventory';
import Item from './Item';
import './ActiveInventory.css';

const MasterInventory = ({ data, setData, setChanged }) => {
  const [nameEditable, setNameEditable] = useState(false);
  const [valueEditable, setValueEditable] = useState(false);

  useEffect(() => {
    getMasterInv().then((result) => {
      if (!(result instanceof Error)) setData(result);
    });
  }, []);

  const handleDelete = (uuid) => {
    const newData = data.filter((item) => item.uuid !== uuid);
    setData(newData);
    setChanged(true);
  };

  const updateItem = (uuid, keyToUpdate, newValue, isNumber) => {
    const tempInventory = data;
    tempInventory.find((x) => x.uuid === uuid)[keyToUpdate] = isNumber
      ? parseInt(newValue, 10)
      : newValue;
    setData(tempInventory);
    setChanged(true);
  };

  return (
    <div>
      <div className="tableItemHeader">
        <div className="inventoryCol1" />
        <div className="inventoryCol2" />
        <div className="inventoryCol3">
          Item Name
          <AiOutlineEdit
            className={`tableEditButton ${nameEditable ? 'selectedBlue' : ''}`}
            size="20"
            onClick={() => setNameEditable(!nameEditable)}
          />
        </div>
        <div className="inventoryCol4">
          Item Price
          <AiOutlineEdit
            className={`tableEditButton ${valueEditable ? 'selectedBlue' : ''}`}
            size="20"
            onClick={() => setValueEditable(!valueEditable)}
          />
        </div>
        <div className="inventoryCol5" />
      </div>
      {data &&
        data.map((item, index) => (
          <Item
            key={index + item.itemName}
            index={index}
            uuid={item.uuid}
            itemName={item.itemName}
            limit={item.itemPrice}
            updateItem={updateItem}
            handleDelete={handleDelete}
            nameEditable={nameEditable}
            valueEditable={valueEditable}
            setChanged={setChanged}
            type="master"
          />
        ))}
    </div>
  );
};

MasterInventory.propTypes = {
  data: PropTypes.arrayOf.isRequired,
  setData: PropTypes.func.isRequired,
  setChanged: PropTypes.func.isRequired,
};
export default MasterInventory;
