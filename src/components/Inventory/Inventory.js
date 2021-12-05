/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState, useEffect } from 'react';
import ReactDOM, { render } from 'react-dom';
import ReactDragListView from 'react-drag-listview/lib/index';
import { Link } from 'react-router-dom';
import { AiFillPrinter } from 'react-icons/ai';
import { GrFormAdd } from 'react-icons/gr';
import './Inventory.css';
import AddItem from './AddItem';
import Item from './Item';

const ReactList = () => {
  const [data, setData] = useState([]);
  const [isAddItemVisible, setAddItemVisible] = useState(false);

  const addItem = () => {
    // add popup
    // setAddItemVisible(true);
    setData([...data, newItem]);
  };

  const updateData = (newData) => {
    console.log(data, newData);
    setData([]);
    setData(data);
  };

  // Properties to pass to ReactDragListView package
  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const newData = data;
      const item = newData.splice(fromIndex, 1)[0];
      newData.splice(toIndex, 0, item);
      updateData(newData);
    },
    nodeSelector: 'li',
    handleSelector: 'div',
    lineClassName: 'dragLine',
  };

  return (
    <div className="inventoryContainer">
      {isAddItemVisible && (
        <AddItem setVisible={setAddItemVisible} setData={setData} data={data} />
      )}
      <div className="inventoryHeader">
        <h2>Inventory ({data.length})</h2>
        <div className="inventoryButton">Print Inventory</div>
        <AiFillPrinter />
        <div className="inventoryButton" onClick={addItem}>
          Add Item
        </div>
        <GrFormAdd />
        <button type="button" className="saveButton">
          Save
        </button>
      </div>
      <div className="itemContainer">
        <div className="containerHeader">
          Item Name <span className="itemLimit">Item Limit</span>
        </div>
        <ReactDragListView {...dragProps}>
          <ul>
            {data.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Item
                number={index}
                name={item.itemName}
                limit={item.itemLimit}
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
    <Link to="/">Back</Link>
    <ReactList />
  </div>
);

export default Inventory;
