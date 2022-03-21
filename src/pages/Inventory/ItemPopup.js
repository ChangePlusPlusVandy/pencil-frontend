/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomCombobox from '../../components/Combobox/CustomCombobox';
import { getMasterInv } from './api-inventory';
import './ItemPopup.css';
import { useAuth } from '../../AuthContext';
import Modal from '../../components/Modal/Modal';

const ItemPopup = ({ show, onClose, onSubmit, currentItems }) => {
  if (!show) return null;
  const [allItems, setAllItems] = useState([]);
  const { currentLocation } = useAuth();
  const [itemName, setItemName] = useState('');
  const [itemLimit, setItemLimit] = useState('');

  useEffect(() => {
    getMasterInv(currentLocation).then((result) => {
      if (result instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(
          'Something went wrong in the backend server. Please contact the developer team'
        );
        console.log(result);
      } else {
        // extract the item names from the currentItems
        const currentItemNames = currentItems.map(
          (item) => item['Item.itemName']
        );
        // filter out the items that are already in the currentItems
        const itemNames = result
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
      disabled={!itemName || itemLimit <= 0}
      onClick={() => onSubmit({ itemName, maxLimit: itemLimit })}
    >
      Add
    </button>
  );

  return (
    <Modal show={show} onClose={onClose} actionButton={modalActionButton}>
      <div className="itemForm">
        <div className="name-area">
          <label className="inputLabel">Item Name</label>
          <CustomCombobox data={allItems} onChange={setItemName} />
        </div>
        <div className="limit-area">
          <label className="inputLabel">Item Limit</label>
          <input
            type="number"
            name="itemLimit"
            value={itemLimit}
            className="primaryInput"
            autoComplete="off"
            onChange={(e) => setItemLimit(e.target.value)}
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
};

ItemPopup.defaultProps = {
  currentItems: [],
};

export default ItemPopup;
