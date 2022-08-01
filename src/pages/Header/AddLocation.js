/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddLocation.css';
import { Checkbox } from 'antd';
import { createNewLocation } from './api-locations';
import 'antd/dist/antd.css';

const AddLocation = ({ show, onClose }) => {
  if (!show) return null;

  const onSubmit = (e, formInfo) => {
    e.preventDefault();
    createNewLocation(formInfo).then(() => {
      onClose();
    });
  };

  const [formInfo, setFormInfo] = useState({
    name: '',
    address: '',
    copy: false,
  });

  const handleChecked = (e) => {
    setFormInfo({ ...formInfo, isDefault: e.target.checked });
  };

  return (
    <div className="location-modal">
      <div className="location-modal-content">
        <form onSubmit={(e) => onSubmit(e, formInfo)}>
          <div className="location-modal-title">Location Name</div>
          <input
            type="text"
            variant="outlined"
            name="name"
            value={formInfo.name}
            className="location-input"
            autoComplete="off"
            onChange={(event) =>
              setFormInfo({ ...formInfo, name: event.target.value })
            }
          />

          <div className="location-modal-title">Full Address</div>
          <input
            type="text"
            variant="outlined"
            name="address"
            value={formInfo.address}
            className="location-input"
            autoComplete="off"
            onChange={(event) =>
              setFormInfo({ ...formInfo, address: event.target.value })
            }
          />
          <div className="copy-checkbox-area">
            <Checkbox onChange={handleChecked}>
              Copy master inventory from existing location
            </Checkbox>
          </div>
          <div className="location-button-group">
            <button
              type="button"
              className="location-modal-close"
              onClick={onClose}
            >
              <u>Cancel</u>
            </button>
            <button type="submit" className="location-modal-add">
              Add Location
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddLocation.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddLocation;
