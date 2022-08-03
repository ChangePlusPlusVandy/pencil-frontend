/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomCombobox from '../../components/Combobox/CustomCombobox';
import { getMasterInv } from './api-inventory';
import Modal from '../../components/Modal/Modal';
import './ItemPopup.css';

const ItemPopup = ({
  show,
  onClose,
  onSubmit,
  currentItems,
  inventoryType,
  popupError,
  itemRefresh,
}) => {
  if (!show) return null;
  const CHARACTER_LIMIT = 30;
  const [allItems, setAllItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const [itemValue, setItemValue] = useState(''); // price or limit depending on inventoryType

  // Updates allItems
  useEffect(() => {
    if (inventoryType !== 'Active') return;
    // only carry out if Active inventory
    try {
      getMasterInv(itemRefresh).then((result) => {
        const currentItemNames = currentItems.map(
          (item) => item['Item.itemName'] // extract the item names from the currentItems
        );

        const itemNames = result // filter out the items that are already in the currentItems
          .map((item) => item.itemName)
          .filter((item) => !currentItemNames.includes(item));
        setAllItems(itemNames);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Modal
      show={show}
      onClose={onClose}
      actionButtonText="Add"
      handleAction={() =>
        onSubmit({
          itemName,
          itemValue,
        })
      }
      actionButtonDisabled={
        !itemName || itemName.length > CHARACTER_LIMIT || itemValue <= 0
      }
    >
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

      {popupError && (
        <p style={{ color: 'red', position: 'absolute' }}>{popupError}</p>
      )}

      {itemName.length > CHARACTER_LIMIT ? (
        <p className="inputSubtitle">Item Name too long</p>
      ) : null}
    </Modal>
  );
};

ItemPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  currentItems: PropTypes.arrayOf(PropTypes.objectOf),
  inventoryType: PropTypes.string.isRequired,
  popupError: PropTypes.string,
  itemRefresh: PropTypes.bool.isRequired,
};

ItemPopup.defaultProps = {
  currentItems: [],
  popupError: '',
};

export default ItemPopup;
