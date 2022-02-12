/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */

import React, { useState, useEffect } from 'react';
import ReactDragListView from 'react-drag-listview/lib/index';
import { Link } from 'react-router-dom';
import { AiFillPrinter } from 'react-icons/ai';
import { GrFormAdd } from 'react-icons/gr';
import './Inventory.css';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import ItemPopup from './ItemPopup';
import Item from './Item';
import { getInventory, postInventory } from './api-inventory';
import printForm from '../../printForm';

const ReactList = () => {
  const [data, setData] = useState([]);
  const [isAddItemVisible, setAddItemVisible] = useState(false);
  const [changed, setChanged] = useState(false);

  const generate = () => {
    const doc = printForm(data);
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${mm}-${dd}-${yyyy}`;

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, `PencilForm.${today}.docx`);
      console.log('Document created!');
    });
  };

  const addItem = (e, formInfo) => {
    e.preventDefault();
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
    console.log(data, newData);
    setData([]); // for some reason react is not rendering when there is only setData(newData)
    setData(newData);
  };

  const handleDelete = (name) => {
    console.log(name);
    const newData = data.filter((item) => item.itemName !== name);
    console.log(newData);
    setData([]);
    setData(newData);
    console.log(data);
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
        <div className="inventoryButton" onClick={generate}>
          Print Inventory
        </div>
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
                updateInventory={setData}
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
