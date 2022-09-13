/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import {
  AiFillPrinter,
  AiOutlineEdit,
  AiOutlineCloud,
  AiOutlinePlus,
} from 'react-icons/ai';
import ReactDragListView from 'react-drag-listview/lib/index';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import ItemPopup from './ItemPopup';
import {
  getInventory,
  getMasterInv,
  postInventory,
  postMasterInv,
} from './api-inventory';
import printForm from '../../utils/printForm';
import { useAuth } from '../../AuthContext';
import InventoryToggle from './InventoryToggle';
import PageContainer from '../../components/PageContainer/PageContainer';
import TableHeader from '../../components/TableHeader/TableHeader';
import Error from '../../components/Error/Error';
import Item from './Item';
import './Inventory.css';

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isAddItemVisible, setAddItemVisible] = useState(false);
  const [changed, setChanged] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [inventoryType, setInventoryType] = useState('Active');
  const [error, setError] = useState('');
  const [popupError, setPopupError] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const { currentLocation } = useAuth();
  const [nameEditable, setNameEditable] = useState(false);
  const [valueEditable, setValueEditable] = useState(false);
  const [itemRefresh, setItemRefresh] = useState(false);
  const valueUnit = inventoryType === 'Active' ? 'Quantity' : 'Price ($)';

  // Creates docx of form and saves it to computer
  const generate = () => {
    const doc = printForm(inventoryData);
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${mm}-${dd}-${yyyy}`;
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `PencilForm.${today}.docx`);
    });
  };

  const changeInventoryType = (type) => {
    setInventoryType(type);
    setChanged(false);
  };

  // Deletes item from inventory
  // @param uuid - uuid of item to delete
  const handleDelete = (uuid) => {
    const checkVal = inventoryData.findIndex((item) => uuid === item.uuid);
    const newData = [...inventoryData];

    if (inventoryType === 'Active') {
      newData.splice(checkVal, 1);
    } else if (inventoryType === 'Master') {
      newData[checkVal].archived = true;
    }

    setInventoryData(newData);
    setChanged(true);
  };

  // Updates item in inventory
  // @param uuid - uuid of item to update
  // @param keyToUpdate - key of item to update
  // @param newValue - value of item to update
  // @param isNumber - bool of if new value is a number
  const updateItem = (uuid, keyToUpdate, newValue, isNumber) => {
    const tempInventory = inventoryData;
    tempInventory.find((x) => x.uuid === uuid)[keyToUpdate] = isNumber
      ? parseInt(newValue, 10)
      : newValue;
    setInventoryData(tempInventory);
    setChanged(true);
  };

  // Changes order of items in inventory
  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const newData = inventoryData; // reorders the item

      const item = newData.splice(fromIndex, 1)[0];
      newData.splice(toIndex, 0, item);
      setChanged(true);
      setInventoryData([]);
      setInventoryData(newData);
    },

    nodeSelector: 'li',
    handleSelector: 'div',
    lineClassName: 'dragLine',
  };

  // Changes view of inventory when inventoryType is changed
  useEffect(async () => {
    setInventoryData([]);
    setNameEditable(false);
    setValueEditable(false);
    setSearchTerm('');
    try {
      if (inventoryType === 'Active') {
        const invData = await getInventory(currentLocation, itemRefresh);

        setInventoryData(invData);
      } else {
        const invData = await getMasterInv(itemRefresh);
        setInventoryData(invData);
      }
    } catch (err) {
      setError(err.message);
      if (err.response?.data && Object.keys(err.response?.data).length) {
        setErrorDescription(err.response?.data);
      }
    }
  }, [inventoryType]);

  // filter the data based on the search term
  useEffect(() => {
    if (inventoryType !== 'Master') return;
    if (searchTerm === '') {
      setFilteredData(inventoryData);
      return;
    }
    const filtered = inventoryData.filter((item) =>
      item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, inventoryData]);

  // Adds item to inventory
  // @param formInfo - object of form info
  const addItem = (formInfo) => {
    if (
      inventoryData.findIndex(
        (item) =>
          (inventoryType === 'Active'
            ? item['Item.itemName']
            : item.itemName) === formInfo.itemName
      ) >= 0
    ) {
      setPopupError('Item already exists in inventory');
      return;
    }
    const newItem =
      inventoryType === 'Active'
        ? {
            'Item.itemName': formInfo.itemName,
            maxLimit: formInfo.itemValue,
            itemOrder: inventoryData.length,
          }
        : {
            itemName: formInfo.itemName,
            itemPrice: formInfo.itemValue,
            archived: false,
          };
    setInventoryData([]);
    setInventoryData([...inventoryData, newItem]);
    setAddItemVisible(false);
    setChanged(true);
    setItemRefresh(true);
    setPopupError('');
  };

  // Saves inventory to database
  const handleSave = async () => {
    let invalid = false;
    const tempInventory = inventoryData;
    tempInventory.forEach((item) => {
      if (item.itemName === '') {
        setError('Item name cannot be empty');
        invalid = true;
      }
      if (item.itemValue === '0') {
        setError('Item value cannot be empty');
        invalid = true;
      }
    });

    if (invalid) return;
    try {
      if (inventoryType === 'Active') {
        await postInventory(inventoryData, currentLocation);
      } else {
        await postMasterInv(inventoryData);
      }
      setChanged(false);
      setNameEditable(false);
      setValueEditable(false);
    } catch (err) {
      setError(err.message);
      if (err.response?.data && Object.keys(err.response?.data).length) {
        setErrorDescription(err.response?.data);
      }
    }
  };

  // List of items to display in top left of screen
  const leftItems = (
    <>
      <div
        className="secondaryButton vertical-align-center"
        onClick={generate}
        hidden={inventoryType !== 'Active'}
      >
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
        <AiOutlinePlus />
      </div>
      <div hidden={inventoryType !== 'Master'}>
        <input
          value={searchTerm}
          className="secondaryInput"
          autoComplete="off"
          placeholder="Search item"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </>
  );

  // List of items to display in top right of screen
  const rightItems = (
    <>
      <InventoryToggle onChange={changeInventoryType} />
      <button
        type="button"
        className="primaryButton"
        disabled={!changed}
        onClick={handleSave}
      >
        {changed ? 'Save' : 'Saved'}
      </button>
    </>
  );

  // List of table headers
  const tableHeaders = (
    <div className="tableItemHeader">
      <div className="inventoryCol1" />
      <div className="inventoryCol2" />
      <div className="inventoryCol3">
        Item Name
        {inventoryType === 'Master' && (
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
    <PageContainer>
      <>
        <ItemPopup
          show={isAddItemVisible}
          onClose={() => {
            setAddItemVisible(false);
            setPopupError('');
          }}
          onSubmit={addItem}
          currentItems={inventoryData}
          inventoryType={inventoryType}
          popupError={popupError}
          itemRefresh={itemRefresh}
          setItemRefresh={setItemRefresh}
        />
        {error && (
          <Error
            error={error}
            description={errorDescription}
            setError={setError}
          />
        )}
        <TableHeader
          title={`${inventoryType} Inventory (${
            inventoryData.length ? inventoryData.length : 0
          })`}
          leftArea={leftItems}
          rightArea={rightItems}
        />
        <div className="tableContainer">
          {inventoryData && inventoryData.length <= 0 ? (
            <div className="noTableData">
              <h3 className="vertical-align-center">
                No data to display
                <AiOutlineCloud size="25" style={{ 'margin-left': '8px' }} />
              </h3>
            </div>
          ) : (
            tableHeaders
          )}
          {inventoryData &&
          inventoryData.length &&
          inventoryType === 'Active' ? (
            <ReactDragListView {...dragProps}>
              <ul className="dragList">
                {inventoryData.map((item, index) => (
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
            filteredData.map(
              (item, index) =>
                !item.archived && (
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
                )
            )
          )}
        </div>
      </>
    </PageContainer>
  );
};

export default Inventory;
