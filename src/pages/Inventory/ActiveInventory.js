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
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    getInventory(currentLocation).then((result) => {
      if (!(result instanceof Error)) setData(result);
    });
  }, []);

  const updateItem = (itemName, keyToUpdate, newValue, isNumber) => {
    console.log('updateItem', itemName, keyToUpdate, newValue, isNumber);
    const tempInventory = data;
    tempInventory.find((x) => x['Item.itemName'] === itemName)[keyToUpdate] =
      isNumber ? parseInt(newValue, 10) : newValue;
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
        <div className="activeInventoryCol1" />
        <div className="activeInventoryCol2" />
        <div className="activeInventoryCol3">Item Name</div>
        <div className="activeInventoryCol4">
          Item Limit
          <AiOutlineEdit
            className={`tableEditButton ${editable ? 'selectedBlue' : ''}`}
            size="20"
            onClick={() => setEditable(!editable)}
          />
        </div>
        <div className="activeInventoryCol5" />
      </div>
      <ReactDragListView {...dragProps}>
        <ul className="dragList">
          {data.map((item, index) => (
            <Item
              key={index + item['Item.itemName']}
              index={index}
              itemName={item['Item.itemName']}
              limit={item.maxLimit}
              updateItem={updateItem}
              handleDelete={handleDelete}
              editable={editable}
              setChanged={setChanged}
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
