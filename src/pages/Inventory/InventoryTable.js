/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import ReactDragListView from 'react-drag-listview/lib/index';
import PropTypes from 'prop-types';
import { AiOutlineEdit } from 'react-icons/ai';
import Item from './Item';
import './InventoryTable.css';

const InventoryTable = ({ data, setData, setChanged, type }) => {
  const [nameEditable, setNameEditable] = useState(false);
  const [valueEditable, setValueEditable] = useState(false);
  const valueUnit = type === 'active' ? 'Quantity' : 'Price ($)';

  const handleDelete = (name) => {
    const newData = data.filter((item) => item.itemName !== name);
    setData(newData);
    setChanged(true);
  };

  const updateItem = (uuid, keyToUpdate, newValue, isNumber) => {
    const tempInventory = data;
    tempInventory.find((x) => x.uuid === uuid)[keyToUpdate] = isNumber
      ? parseInt(newValue, 10)
      : newValue;
    console.log('this is temp', tempInventory);
    setData(tempInventory);
    setChanged(true);
  };

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

  const tableHeaders = (
    <div className="tableItemHeader">
      <div className="inventoryCol1" />
      <div className="inventoryCol2" />
      <div className="inventoryCol3">
        Item Name
        {type === 'master' && (
          <AiOutlineEdit
            className={`tableEditButton ${nameEditable ? 'selectedBlue' : ''}`}
            size="20"
            onClick={() => setNameEditable(!nameEditable)}
          />
        )}
      </div>
      <div className="inventoryCol4">
        Item {valueUnit}
        <AiOutlineEdit
          className={`tableEditButton ${valueEditable ? 'selectedBlue' : ''}`}
          size="20"
          onClick={() => setValueEditable(!valueEditable)}
        />
      </div>
      <div className="inventoryCol5" />
    </div>
  );

  return (
    <div>
      {tableHeaders}
      {data && type === 'active' ? (
        <ReactDragListView {...dragProps}>
          <ul className="dragList">
            {data.map((item, index) => (
              <Item
                key={index + item['Item.itemName']}
                index={index}
                uuid={item.uuid}
                itemName={item['Item.itemName']}
                itemValue={item.maxLimit}
                updateItem={updateItem}
                handleDelete={handleDelete}
                valueEditable={valueEditable}
                setChanged={setChanged}
                type="active"
              />
            ))}
          </ul>
        </ReactDragListView>
      ) : (
        data.map((item, index) => (
          <Item
            key={index + item.itemName}
            index={index}
            uuid={item.uuid}
            itemName={item.itemName}
            itemValue={item.itemPrice}
            updateItem={updateItem}
            handleDelete={handleDelete}
            nameEditable={nameEditable}
            valueEditable={valueEditable}
            setChanged={setChanged}
            type="master"
          />
        ))
      )}
    </div>
  );
};

InventoryTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  setData: PropTypes.func.isRequired,
  setChanged: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
export default InventoryTable;
