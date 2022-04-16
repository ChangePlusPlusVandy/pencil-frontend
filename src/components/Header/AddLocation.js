/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { createNewLocation } from './api-locations';
import Modal from '../Modal/Modal';

const AddLocation = ({ show, onClose }) => {
  if (!show) return null;

  const CHARACTER_LIMIT = 18;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = () => {
    createNewLocation({ name, address }).then((res) => {
      console.log('Location created: ', res);
      onClose();
    });
    window.location.reload();
  };

  const validateInput = () =>
    !name || name.length > CHARACTER_LIMIT || !address;

  return (
    <Modal
      show={show}
      onClose={onClose}
      actionButtonText="Add"
      handleAction={handleSubmit}
      actionButtonDisabled={validateInput()}
    >
      <label className="inputLabel">
        Location Name
        <input
          value={name}
          className="primaryInput"
          autoComplete="off"
          onChange={(e) => setName(e.target.value)}
        />
        {name.length > CHARACTER_LIMIT ? (
          <p className="inputSubtitle">Input length too long</p>
        ) : null}
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
    </Modal>
  );
};

AddLocation.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AddLocation;
