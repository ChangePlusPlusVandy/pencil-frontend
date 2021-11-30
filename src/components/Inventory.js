/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import ReactDOM, { render } from 'react-dom';
import ReactDragListView from 'react-drag-listview/lib/index';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import './Inventory.css';

const ReactList = () => {
  const [data, setData] = useState([]);

  // const tempData = [
  //   {
  //     itemName: 'Backpacks',
  //     itemLimit: '6',
  //   },
  //   {
  //     itemName: 'Crayons (packs)',
  //     itemLimit: '6',
  //   },
  //   {
  //     itemName: '8 oz Glue',
  //     itemLimit: '6',
  //   },
  //   {
  //     itemName: 'Hand Fans',
  //     itemLimit: '60',
  //   },
  //   {
  //     itemName: 'Erasers',
  //     itemLimit: '6',
  //   },
  //   {
  //     itemName: 'Pens',
  //     itemLimit: '200',
  //   },
  //   {
  //     itemName: 'Pencils',
  //     itemLimit: '120',
  //   },
  //   {
  //     itemName: 'Posters',
  //     itemLimit: '50',
  //   },
  // ];

  const newItem = {
    itemName: 'Generic Item #',
    itemLimit: data.length + 1,
  };

  const addItem = () => {
    // add popup
    setData([...data, newItem]);
  };

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const newData = data;
      const item = newData.splice(fromIndex, 1)[0];
      newData.splice(toIndex, 0, item);
      setData(newData);
    },
    nodeSelector: 'li',
    handleSelector: 'div',
  };

  return (
    <div className="reactList">
      <div className="inventoryHeader">
        <h2>Inventory ({data.length})</h2>
        <div className="inventoryButton">Print Inventory</div>
        <div className="inventoryButton" onClick={addItem}>
          Add Item
        </div>
        <button type="button" className="saveButton">
          Save
        </button>
      </div>
      <ReactDragListView {...dragProps}>
        <ul>
          {data.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <div className="dragIcon">
                <GiHamburgerMenu />
              </div>
              <div className="itemOrder">{index + 1}</div>
              {item.itemName}
              {item.itemLimit}
            </li>
          ))}
        </ul>
      </ReactDragListView>
    </div>
  );
};

const Inventory = () => {
  const a = 0;

  return (
    <div>
      <Link to="/">Back</Link>
      <ReactList />
    </div>
  );
};

export default Inventory;
