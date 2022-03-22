/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomCombobox from '../../components/Combobox/CustomCombobox';
import { getMasterInv } from './api-inventory';
import './ItemPopup.css';
import { useAuth } from '../../AuthContext';
import Modal from '../../components/Modal/Modal';

const ItemPopup = ({
  show,
  onClose,
  onSubmit,
  currentItems,
  inventoryType,
}) => {
  if (!show) return null;
  const [allItems, setAllItems] = useState([]);
  const { currentLocation } = useAuth();
  const [itemName, setItemName] = useState('');
  const [itemValue, setItemValue] = useState(''); // price or limit depending on inventoryType

  useEffect(() => {
    if (inventoryType !== 'Active') return;
    // only carry out if Active inventory
    getMasterInv(currentLocation).then((result) => {
      if (result instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(
          'Something went wrong in the backend server. Please contact the developer team'
        );
        console.log(result);
      } else {
        const currentItemNames = currentItems.map(
          (item) => item['Item.itemName'] // extract the item names from the currentItems
        );

        const itemNames = result // filter out the items that are already in the currentItems
          .map((item) => item.itemName)
          .filter((item) => !currentItemNames.includes(item));
        setAllItems(itemNames);
      }
    });
  }, []);

  const modalActionButton = (
    <button
      type="submit"
      className="primaryButton"
      disabled={!itemName || itemValue <= 0}
      onClick={() =>
        onSubmit({
          itemName,
          itemValue,
        })
      }
    >
      Add
    </button>
  );

  return (
    <Modal show={show} onClose={onClose} actionButton={modalActionButton}>
      <div className="itemForm">
        <div className="name-area">
          <label className="inputLabel">Item Name</label>
          {inventoryType === 'Active' ? (
            <CustomCombobox data={allItems} onChange={setItemName} />
          ) : (
            <input
              name="itemName"
              value={itemName}
              className="primaryInput"
              autoComplete="off"
              onChange={(e) => setItemName(e.target.value)}
            />
          )}
        </div>
        <div className="limit-area">
          <label className="inputLabel">
            Item {inventoryType === 'Active' ? 'Limit' : 'Price ($)'}
          </label>
          <input
            type="number"
            name="itemValue"
            value={itemValue}
            className="primaryInput"
            autoComplete="off"
            onChange={(e) => setItemValue(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
};

ItemPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.object),
  inventoryType: PropTypes.string.isRequired,
};

ItemPopup.defaultProps = {
  currentItems: [],
};

export default ItemPopup;
