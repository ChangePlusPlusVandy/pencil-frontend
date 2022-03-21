/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CustomCombobox from '../../components/Combobox/CustomCombobox';
import { getMasterInv } from './api-inventory';
import './ItemPopup.css';
import { useAuth } from '../../AuthContext';

const ItemPopup = ({ show, onClose, onSubmit }) => {
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
        // build an array of only the names of each item
        const itemNames = result.map((item) => item.itemName);
        setAllItems(itemNames);
      }
    });
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <form
          className="itemForm"
          onSubmit={() => onSubmit({ itemName, maxLimit: itemLimit })}
        >
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
          <div className="add-button-group">
            <button type="button" className="secondaryButton" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="primaryButton"
              disabled={!itemName || itemLimit <= 0}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ItemPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ItemPopup;
