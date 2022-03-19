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
import MasterInventory from './MasterInventory';
import PageContainer from '../../components/PageContainer/PageContainer';
import TableHeader from '../../components/TableHeader/TableHeader';
import Errors from '../../components/Errors/Errors';

const ReactList = () => {
  const [data, setData] = useState([]);
  const [masterInventoryData, setMasterInventoryData] = useState([]);
  const [isAddItemVisible, setAddItemVisible] = useState(false);
  const [changed, setChanged] = useState(false);
  const [locationSelected, setLocationSelected] = useState(false);
  const [inventory, setInventory] = useState('Active');
  const { currentLocation } = useAuth();
  const [error, setError] = useState(false);

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
    console.log('Adding item: ', formInfo);
    if (
      formInfo.itemName === '' ||
      formInfo.itemName === undefined ||
      formInfo.maxLimit === 0
    ) {
      // TODO: add alert dialog
      console.log('Cant have empty entries!');
      return;
    }
    if (data.some((item) => item['Item.itemName'] === formInfo.itemName)) {
      // TODO: add alert dialog
      console.log('Cant have duplicate entries!');
      return;
    }

    const newItem = {
      itemId: Math.floor(Math.random() * 1000),
      'Item.itemName': formInfo.itemName,
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
    const newData = data.filter((item) => item['Item.itemName'] !== name);
    console.log(newData);
    setData([]);
    setData(newData);
    console.log(data);
    setChanged(true);
  };

  const handleSave = () => {
    if (inventory === 'Active') {
      const result = postInventory(data, currentLocation);

      if (result && result.error) {
        setError(result.error);
      }
    } else if (inventory === 'Master') {
      postMasterInv(masterInventoryData, currentLocation);
    }
    setChanged(false);
  };

  const handleErrorClose = () => {
    setError(true);
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
    getInventory(currentLocation)
      .then((result) => {
        if ('error' in result) {
          // eslint-disable-next-line no-alert
          alert('No location is selected. Please select a location');
          setError(result.error);
        } else {
          setData(result);
          console.log('getting inventory', result);
          setLocationSelected(true);
        }
      })
      .catch((err) => {
        // eslint-disable-next-line no-alert
        alert(
          'Something went wrong in the backend Server. Please contact the developer team.'
        );
        console.log('ERROR', err);
      });
  }, []);

  const leftItems = (
    <>
      <div className="secondaryButton vertical-align-center">
        Print Inventory
        <AiFillPrinter />
      </div>

      <div
        className="secondaryButton vertical-align-center"
        role="button"
        tabIndex={0}
        onClick={() => setAddItemVisible(true)}
        onKeyDown={() => {}}
      >
        Add Item
        <GrFormAdd />
      </div>
    </>
  );

  const rightItems = (
    <>
      <InventoryToggle onChange={setInventory} />
      <button
        type="button"
        className="primaryButton"
        disabled={!changed}
        onClick={handleSave}
      >
        Save
      </button>
    </>
  );

  return (
    <>
      <ItemPopup
        show={isAddItemVisible}
        onClose={handleClose}
        onSubmit={addItem}
      />

      {!error && <Errors handleError={handleErrorClose} />}

      <TableHeader
        title={`Inventory (${locationSelected ? data.length : 0})`}
        leftArea={leftItems}
        rightArea={rightItems}
      />
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
                    key={item['Item.itemName']}
                    number={index}
                    itemName={item['Item.itemName']}
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
    </>
  );
};

const Inventory = () => (
  <PageContainer>
    <ReactList />
  </PageContainer>
);

export default Inventory;
