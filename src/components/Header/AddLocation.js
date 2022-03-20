/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './AddLocation.css';
import { createNewLocation } from './api-locations';

const AddLocation = ({ show, onClose }) => {
  if (!show) return null;

  const onSubmit = (e, formInfo) => {
    e.preventDefault();
    console.log('Adding location: ', formInfo);
    createNewLocation(formInfo).then((res) => {
      console.log('Location created: ', res);
      onClose();
    });
    window.location.reload();
  };

  const [formInfo, setFormInfo] = useState({
    name: '',
    address: '',
    copy: false,
  });

  const handleChecked = (e) => {
    setFormInfo({ ...formInfo, copy: e.target.checked });
  };

  return (
    <div className="location-modal">
      <div className="location-modal-content">
        <form onSubmit={(e) => onSubmit(e, formInfo)}>
          <label className="inputLabel">
            Location Name
            <input
              value={formInfo.name}
              className="primaryInput"
              autoComplete="off"
              onChange={(event) =>
                setFormInfo({ ...formInfo, name: event.target.value })
              }
            />
          </label>
          <label className="inputLabel">
            Full Address
            <input
              value={formInfo.address}
              className="primaryInput"
              autoComplete="off"
              onChange={(event) =>
                setFormInfo({ ...formInfo, address: event.target.value })
              }
            />
          </label>
          <label className="inputLabel vertical-align-center">
            <input
              type="checkbox"
              className="customCheckbox"
              checked={formInfo.copy}
              onChange={handleChecked}
            />
            Copy master inventory from existing location
          </label>
          <label>
            <input type="select" />
          </label>
          <div className="location-button-group">
            <button type="button" className="secondaryButton" onClick={onClose}>
              <u>Cancel</u>
            </button>
            <button
              type="submit"
              className="primaryButton"
              disabled={!formInfo.name || !formInfo.address}
            >
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
