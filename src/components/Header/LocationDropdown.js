/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { getAllLocations } from './api-locations';
import AddLocation from './AddLocation';
import CustomDropdown from '../Dropdowns/CustomDropdown';
import 'antd/dist/antd.css';

const LocationDropdown = ({ setError, setErrorDescription }) => {
  const { currentLocation, updateLocation } = useAuth();
  const [allLocations, setAllLocations] = useState([]);
  const [isAddLocationVisible, setAddLocationVisible] = useState(false);

  const history = useHistory();

  const handleClick = (e) => {
    updateLocation(e.target.innerText);
    history.push('/');
  };

  const handleAddLocation = () => {
    setAddLocationVisible(true);
  };

  const handleClose = () => {
    setAddLocationVisible(false);
  };

  useEffect(async () => {
    try {
      await getAllLocations().then((result) =>
        setAllLocations(
          result.filter((location) => location.name !== currentLocation)
        )
      );
    } catch (err) {
      setError(err.message);
      if (err.response?.data && Object.keys(err.response?.data).length) {
        setErrorDescription(err.response?.data);
      }
    }
  }, []);

  const menu = (
    <>
      {allLocations.length
        ? allLocations.map((loc) => (
            <a key={loc.name} onClick={handleClick}>
              {loc.name}
            </a>
          ))
        : null}
      <div className="horizontal_line" />
      <a
        className="secondaryButton vertical-align-center no-margin"
        onClick={handleAddLocation}
      >
        Add Location <TiPlus style={{ marginLeft: '2px' }} />
      </a>
    </>
  );

  return (
    <>
      <AddLocation show={isAddLocationVisible} onClose={handleClose} />
      <CustomDropdown
        title={currentLocation || 'Location'}
        menuItems={menu}
        type="large"
      />
    </>
  );
};

LocationDropdown.propTypes = {
  setError: PropTypes.func.isRequired,
  setErrorDescription: PropTypes.func.isRequired,
};

export default LocationDropdown;
