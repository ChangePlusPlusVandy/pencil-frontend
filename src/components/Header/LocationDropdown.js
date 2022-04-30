/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useState } from 'react';
import { TiPlus } from 'react-icons/ti';
import { useAuth } from '../../AuthContext';
import { getAllLocations } from './api-locations';
import AddLocation from './AddLocation';
import CustomDropdown from '../Dropdowns/CustomDropdown';
import 'antd/dist/antd.css';

const LocationDropdown = () => {
  const { currentLocation, updateLocation } = useAuth();
  const [allLocations, setAllLocations] = useState([]);
  const [isAddLocationVisible, setAddLocationVisible] = useState(false);

  const handleClick = (e) => {
    updateLocation(e.target.innerText);
    window.location.reload();
  };

  const handleAddLocation = () => {
    setAddLocationVisible(true);
  };

  const handleClose = () => {
    setAddLocationVisible(false);
  };

  useEffect(() => {
    getAllLocations().then((result) => {
      if (result.error) {
        // eslint-disable-next-line no-alert
        alert(
          'Something went wrong in the backend Server. Please contact the developer team.'
        );
      } else if (result)
        setAllLocations(
          result.filter((location) => location.name !== currentLocation)
        );
    });
  }, []);

  const menu = (
    <>
      {allLocations.length
        ? allLocations.map((loc, index) => (
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

export default LocationDropdown;
