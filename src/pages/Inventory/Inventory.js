/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import { GrFormAdd } from 'react-icons/gr';
import { IoMdRefresh } from 'react-icons/io';
import './Inventory.css';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import ActiveInventory from './ActiveInventory';
import ItemPopup from './ItemPopup';
import { postInventory, postMasterInv } from './api-inventory';
import printForm from '../../utils/printForm';
import { useAuth } from '../../AuthContext';
import InventoryToggle from './InventoryToggle';
import MasterInventory from './MasterInventory';
import PageContainer from '../../components/PageContainer/PageContainer';
import TableHeader from '../../components/TableHeader/TableHeader';
import Errors from '../../components/Errors/Errors';

const Inventory = () => {
  const [activeInventoryData, setActiveInventoryData] = useState([]);
  const [masterInventoryData, setMasterInventoryData] = useState([]);
  const [isAddItemVisible, setAddItemVisible] = useState(false);
  const [changed, setChanged] = useState(false);
  const [inventoryType, setInventoryType] = useState('Active');
  const [error, setError] = useState('');
  const { currentLocation } = useAuth();

  const generate = () => {
    const doc = printForm(activeInventoryData);
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${mm}-${dd}-${yyyy}`;
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `PencilForm.${today}.docx`);
    });
  };

  const addItem = (formInfo) => {
    if (inventoryType === 'Active') {
      const newItem = {
        itemId: Math.floor(Math.random() * 1000),
        'Item.itemName': formInfo.itemName,
        maxLimit: formInfo.itemValue,
        itemOrder: activeInventoryData.length,
      };
      setActiveInventoryData([...activeInventoryData, newItem]);
    } else {
      const newItem = {
        itemName: formInfo.itemName,
        itemPrice: formInfo.itemValue,
      };
      setMasterInventoryData([...masterInventoryData, newItem]);
    }
    setAddItemVisible(false);
    setChanged(true);
  };

  const handleSave = () => {
    const result =
      inventoryType === 'Active'
        ? postInventory(activeInventoryData, currentLocation)
        : postMasterInv(masterInventoryData);

    if (result && result.error) setError(result.error);
    setChanged(false);
  };

  const leftItems = (
    <>
      <div className="secondaryButton vertical-align-center" onClick={generate}>
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
      <IoMdRefresh className="refreshButton" size="26" />
      <InventoryToggle onChange={setInventoryType} />
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
    <PageContainer>
      <ItemPopup
        show={isAddItemVisible}
        onClose={() => setAddItemVisible(false)}
        onSubmit={addItem}
        currentItems={activeInventoryData}
        inventoryType={inventoryType}
      />

      {error && <Errors error={error} handleError={() => setError('')} />}

      <TableHeader
        title={`${inventoryType} Inventory (${
          inventoryType === 'Active'
            ? activeInventoryData.length
            : masterInventoryData.length
        })`}
        leftArea={leftItems}
        rightArea={rightItems}
      />
      <div className="tableContainer">
        {inventoryType === 'Active' ? (
          <ActiveInventory
            data={activeInventoryData}
            setData={setActiveInventoryData}
            setChanged={setChanged}
          />
        ) : (
          <MasterInventory
            data={masterInventoryData}
            setData={setMasterInventoryData}
            setChanged={setChanged}
          />
        )}
      </div>
    </PageContainer>
  );
};

export default Inventory;
