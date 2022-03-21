/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createNewLocation } from './api-locations';

const AddLocation = ({ show, onClose }) => {
  if (!show) return null;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formInfo = {
      name,
      address,
    };
    createNewLocation(formInfo).then((res) => {
      console.log('Location created: ', res);
      onClose();
    });
    window.location.reload();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <label className="inputLabel">
            Location Name
            <input
              value={name}
              className="primaryInput"
              autoComplete="off"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="inputLabel">
            Full Address
            <input
              value={address}
              className="primaryInput"
              autoComplete="off"
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <div className="add-button-group">
            <button type="button" className="secondaryButton" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="primaryButton"
              disabled={!name || !address}
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
