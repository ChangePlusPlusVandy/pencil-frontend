/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import ReactDragListView from 'react-drag-listview/lib/index';
import PropTypes from 'prop-types';
import { AiOutlineEdit } from 'react-icons/ai';
import Item from './Item';
import { getInventory } from './api-inventory';
import { useAuth } from '../../AuthContext';
import './ActiveInventory.css';

const ActiveInventory = ({ data, setData, setChanged }) => {
  const { currentLocation } = useAuth();
  const [valueEditable, setValueEditable] = useState(false);

  useEffect(() => {
    getInventory(currentLocation).then((result) => {
      if (!(result instanceof Error)) setData(result);
    });
  }, []);

  const updateItem = (uuid, keyToUpdate, newValue, isNumber) => {
    const tempInventory = data;
    tempInventory.find((x) => x.uuid === uuid)[keyToUpdate] = isNumber
      ? parseInt(newValue, 10)
      : newValue;
    console.log('this is temp', tempInventory);
    setData(tempInventory);
    setChanged(true);
  };

  const handleDelete = (name) => {
    const newData = data.filter((item) => item['Item.itemName'] !== name);
    setData(newData);
    setChanged(true);
  };

  // Properties to pass to ReactDragListView package
  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const newData = data; // reorders the item

      const item = newData.splice(fromIndex, 1)[0];
      newData.splice(toIndex, 0, item);
      setChanged(true);
      setData([]);
      setData(newData);
    },

    nodeSelector: 'li',
    handleSelector: 'div',
    lineClassName: 'dragLine',
  };

  return (
    <>
      <div className="tableItemHeader">
        <div className="inventoryCol1" />
        <div className="inventoryCol2" />
        <div className="inventoryCol3">Item Name</div>
        <div className="inventoryCol4">
          Item Limit
          <AiOutlineEdit
            className={`tableEditButton ${valueEditable ? 'selectedBlue' : ''}`}
            size="20"
            onClick={() => setValueEditable(!valueEditable)}
          />
        </div>
        <div className="inventoryCol5" />
      </div>
      <ReactDragListView {...dragProps}>
        <ul className="dragList">
          {data.map((item, index) => (
            <Item
              key={index + item['Item.itemName']}
              index={index}
              uuid={item.uuid}
              itemName={item['Item.itemName']}
              limit={item.maxLimit}
              updateItem={updateItem}
              handleDelete={handleDelete}
              nameEditable={false}
              valueEditable={valueEditable}
              setChanged={setChanged}
              type="active"
            />
          ))}
        </ul>
      </ReactDragListView>
    </>
  );
};

export default ActiveInventory;

ActiveInventory.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  setData: PropTypes.func.isRequired,
  setChanged: PropTypes.func.isRequired,
};
