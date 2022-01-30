import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ItemPopup.css';

const ItemPopup = ({ show, onClose, onSubmit }) => {
  if (!show) return null;

  const [formInfo, setFormInfo] = useState({
    itemName: '',
    maxLimit: undefined,
  });
  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={(e) => onSubmit(e, formInfo)}>
          <div className="inline-block">
            <div className="name-area">
              <div className="modal-title">Item Name</div>
              <input
                type="text"
                variant="outlined"
                name="itemName"
                value={formInfo.itemName}
                className="input-field"
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
                variant="outlined"
                name="itemLimit"
                value={formInfo.maxLimit}
                className="input-field"
                autoComplete="off"
                onChange={(event) =>
                  setFormInfo({ ...formInfo, maxLimit: event.target.value })
                }
              />
            </div>
          </div>
          <div className="button-group">
            <button
              type="button"
              className="action-button close"
              onClick={onClose}
            >
              <u>Cancel</u>
            </button>
            <button type="submit" className="action-button submit">
              Save
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