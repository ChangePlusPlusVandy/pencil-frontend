/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */

import React, { useState, useEffect } from 'react';
import ReactDragListView from 'react-drag-listview/lib/index';
import { Link } from 'react-router-dom';
import { AiFillPrinter } from 'react-icons/ai';
import { GrFormAdd } from 'react-icons/gr';
import './Inventory.css';
import ItemPopup from './ItemPopup';
import Item from './Item';
import { getInventory, postInventory } from './api-inventory';

const ReactList = () => {
  const [data, setData] = useState([]);
  const [isAddItemVisible, setAddItemVisible] = useState(false);
  const [changed, setChanged] = useState(false);

  const addItem = (e, formInfo) => {
    e.preventDefault();
    console.log('Adding item: ', data);
    if (
      formInfo.itemName === '' ||
      formInfo.itemName === undefined ||
      formInfo.maxLimit === 0
    ) {
      // TODO: add alert dialog
      console.log('Cant have empty entries!');
      return;
    }
    if (data.some((item) => item.itemName === formInfo.itemName)) {
      // TODO: add alert dialog
      console.log('Cant have duplicate entries!');
      return;
    }

    const newItem = {
      itemId: Math.floor(Math.random() * 1000),
      itemName: formInfo.itemName,
      maxLimit: formInfo.maxLimit,
      itemOrder: data.length,
    };
    // add popup
    setData([...data, newItem]);

    console.log(data);
    setAddItemVisible(false);
    setChanged(true);
  };

  const handleClose = () => {
    console.log(data);
    setAddItemVisible(false);
  };

  const updateData = (newData) => {
    setChanged(true);
    setData([]); // for some reason react is not rendering when there is only setData(newData)
    setData(newData);
  };

  const handleItemChange = (item) => {
    setChanged(true);
    setData(item);
  };

  const handleDelete = (name) => {
    console.log(name);
    const newData = data.filter((item) => item.itemName !== name);
    console.log(newData);
    setData([]);
    setData(newData);
    console.log(data);
    setChanged(true);
  };

  const handleSave = () => {
    const toSubmit = data;
    postInventory(toSubmit).then((result) => {
      console.log(result);
      // if (result.error) {
      //   console.log(result.error);
      // } else {
      //   setData(result);
      // }
    });
    setChanged(false);
  };

  // Properties to pass to ReactDragListView package
  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const newData = data;
      // reorders the item
      const item = newData.splice(fromIndex, 1)[0];
      newData.splice(toIndex, 0, item);
      updateData(newData);
    },
    nodeSelector: 'li',
    handleSelector: 'div',
    lineClassName: 'dragLine',
  };

  useEffect(() => {
    if (changed) {
      document.getElementById('saveButton').className = 'saveButtonChanged';
    } else {
      document.getElementById('saveButton').className = 'saveButton';
    }
  }, [changed]);

  useEffect(() => {
    getInventory().then((result) => {
      if (result instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(
          'Something went wrong in the backend Server. Please contact the developer team.'
        );
      } else {
        setData(result);
        console.log('getting inventory', result);
      }
    });
  }, []);

  return (
    <div className="inventoryContainer">
      <ItemPopup
        show={isAddItemVisible}
        onClose={handleClose}
        onSubmit={addItem}
      />
      <div className="inventoryHeader">
        <h2>Inventory ({data.length})</h2>
        <div className="inventoryButton">Print Inventory</div>
        <AiFillPrinter />
        <div
          className="inventoryButton"
          onClick={() => setAddItemVisible(true)}
        >
          Add Item
        </div>
        <GrFormAdd />
        <button
          type="button"
          className="saveButton"
          id="saveButton"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
      <div className="itemContainer">
        <div className="containerHeader">
          Item Name <span className="headerItemLimit">Item Limit</span>
        </div>
        <ReactDragListView {...dragProps}>
          <ul className="dragList">
            {data.map((item, index) => (
              <Item
                key={item.itemName}
                number={index}
                name={item.itemName}
                limit={item.maxLimit}
                inventory={data}
                updateInventory={handleItemChange}
                handleDelete={handleDelete}
              />
            ))}
          </ul>
        </ReactDragListView>
      </div>
    </div>
  );
};

const Inventory = () => (
  <div>
    <ReactList />
  </div>
);

export default Inventory;
