import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ItemPopup.css';

const ItemPopup = ({ show, onClose, onSubmit }) => {
  if (!show) return null;

  const [formInfo, setFormInfo] = useState({
    itemName: '',
    maxLimit: 0,
  });
  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={(e) => onSubmit(e, formInfo)}>
          <div className="name-area">
            <div className="modal-title">Item Name</div>
            <input
              type="text"
              name="itemName"
              value={formInfo.itemName}
              className="add-item-input"
              autoComplete="off"
              onChange={(event) =>
                setFormInfo({ ...formInfo, itemName: event.target.value })
              }
            />
          </div>

          <div className="limit-area">
            <div className="modal-title">Item Limit</div>
            <input
              type="number"
              name="itemLimit"
              value={formInfo.maxLimit}
              className="add-item-input"
              autoComplete="off"
              onChange={(event) =>
                setFormInfo({ ...formInfo, maxLimit: event.target.value })
              }
            />
          </div>
          <div className="add-button-group">
            <button type="button" className="secondaryButton" onClick={onClose}>
              <u>Cancel</u>
            </button>
            <button
              type="submit"
              className="primaryButton"
              disabled={
                !formInfo.itemName ||
                !formInfo.maxLimit ||
                formInfo.maxLimit <= 0
              }
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
