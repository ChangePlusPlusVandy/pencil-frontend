/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './AddLocation.css';
import { createNewLocation, getAllLocations } from './api-locations';
import CustomCombobox from '../Combobox/CustomCombobox';

const AddLocation = ({ show, onClose }) => {
  if (!show) return null;
  const [locations, setLocations] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [copy, setCopy] = useState(false);
  const [copyLocation, setCopyLocation] = useState('');

  useEffect(() => {
    getAllLocations().then((data) => {
      const locationNames = data.map((location) => location.name);
      setLocations(locationNames);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formInfo = {
      name,
      address,
      copy,
      copyLocation,
    };
    createNewLocation(formInfo).then((res) => {
      console.log('Location created: ', res);
      onClose();
    });
    window.location.reload();
  };

  return (
    <div className="location-modal-backdrop">
      <div className="location-modal-content">
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
          <label className="inputLabel vertical-align-center">
            <input
              type="checkbox"
              className="customCheckbox"
              checked={copy}
              onClick={() => setCopy(!copy)}
            />
            Copy master inventory from existing location
          </label>
          <CustomCombobox
            data={locations}
            disabled={!copy}
            onChange={setCopyLocation}
          />
          <div className="location-button-group">
            <button type="button" className="secondaryButton" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="primaryButton"
              disabled={!name || !address || (copy && !copyLocation)}
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
