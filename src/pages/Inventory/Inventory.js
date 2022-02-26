/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */

import React, { useState, useEffect } from 'react';
import ReactDragListView from 'react-drag-listview/lib/index';
import { AiFillPrinter } from 'react-icons/ai';
import { GrFormAdd } from 'react-icons/gr';
import './Inventory.css';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import ItemPopup from './ItemPopup';
import Item from './Item';
import { getInventory, postInventory, postMasterInv } from './api-inventory';
import printForm from '../../utils/printForm';
import { useAuth } from '../../AuthContext';
import InventoryToggle from './InventoryToggle';
import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import MasterInventory from './MasterInventory';

const ReactList = () => {
  const [data, setData] = useState([]);
  const [masterInventoryData, setMasterInventoryData] = useState([]);
  const [isAddItemVisible, setAddItemVisible] = useState(false);
  const [changed, setChanged] = useState(false);
  const [locationSelected, setLocationSelected] = useState(false);
  const [inventory, setInventory] = useState('Active');
  const { getCurrentLocation } = useAuth();

  const generate = () => {
    const doc = printForm(data);
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${mm}-${dd}-${yyyy}`;

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `PencilForm.${today}.docx`);
    });
  };

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
    if (inventory === 'Active') {
      postInventory(data, getCurrentLocation());
    } else if (inventory === 'Master') {
      postMasterInv(masterInventoryData, getCurrentLocation());
    }
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
    if (changed && inventory === 'Active') {
      document.getElementById('saveButton').className = 'saveButtonChanged';
    } else if (inventory === 'Active') {
      document.getElementById('saveButton').className = 'saveButton';
    } else {
      // Do nothing
    }
  }, [changed]);

  useEffect(() => {
    const location = getCurrentLocation();
    getInventory(location)
      .then((result) => {
        if (result instanceof Error) {
          // eslint-disable-next-line no-alert
          alert(
            'Something went wrong in the backend Server. Please contact the developer team.'
          );
        } else if ('error' in result) {
          // eslint-disable-next-line no-alert
          alert('No location is selected. Please select a location');
        } else {
          setData(result);
          console.log('getting inventory', result);
          setLocationSelected(true);
        }
      })
      .catch((err) => {
        console.log('ERROR', err);
      });
  }, []);

  return (
    <div>
      <Header />
      <Menu />
      <div className="inventoryContainer">
        <ItemPopup
          show={isAddItemVisible}
          onClose={handleClose}
          onSubmit={addItem}
        />
        <div className="tableHeaderArea">
          <h1 className="tableHeaderTitle">
            Inventory ({locationSelected ? data.length : 0})
          </h1>
          {locationSelected && (
            <>
              <div className="inventoryButton">Print Inventory</div>
              <AiFillPrinter />
              <div
                className="inventoryButton"
                onClick={() => setAddItemVisible(true)}
              >
                Add Item
              </div>
              <GrFormAdd />
            </>
          )}

          <InventoryToggle onChange={setInventory} />
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
          {inventory === 'Active' ? (
            <div>
              <div className="dragList">
                <div className="containerHeader">
                  <div className="headerName">Item Name</div>
                  <div className="headerItemLimit">Item Limit</div>
                </div>
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
          ) : (
            <MasterInventory
              data={masterInventoryData}
              setData={setMasterInventoryData}
            />
          )}
        </div>
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