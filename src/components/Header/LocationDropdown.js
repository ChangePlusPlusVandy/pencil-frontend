/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */

import React, { useEffect, useState } from 'react';
import { Dropdown } from 'antd';
import { FaChevronDown } from 'react-icons/fa';
import { TiPlus } from 'react-icons/ti';
import { useAuth } from '../../AuthContext';
import { getAllLocations } from './api-locations';
import AddLocation from './AddLocation';
import 'antd/dist/antd.css';

const LocationDropdown = () => {
  const { getCurrentLocation, updateLocation } = useAuth();
  const [location, setLocation] = useState();
  const [allLocations, setAllLocations] = useState([{ name: 'Location' }]);
  const [isAddLocationVisible, setAddLocationVisible] = useState(false);

  const handleClick = (e) => {
    setLocation(e.target.innerText);
    updateLocation(e.target.innerText);
  };

  const handleAddLocation = () => {
    setAddLocationVisible(true);
  };

  const handleClose = () => {
    console.log();
    setAddLocationVisible(false);
  };

  useEffect(() => {
    getAllLocations().then((result) => {
      if (result instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(
          'Something went wrong in the backend Server. Please contact the developer team.'
        );
      } else {
        setAllLocations(result);
      }
    });
    const currentLocation = getCurrentLocation();
    if (currentLocation) {
      setLocation(currentLocation);
    }
  }, []);

  const menu = (
    <div className="dropdown_menu pencil-cursor">
      {allLocations.map((loc) => (
        <a className="pencil-cursor" onClick={handleClick}>
          {loc.name}
        </a>
      ))}
      <div className="horizontal_line" />
      <a
        className="addLocationButton pencil-cursor"
        onClick={handleAddLocation}
      >
        Add Location <TiPlus style={{ marginLeft: '2px' }} />
      </a>
    </div>
  );

  return (
    <div>
      <AddLocation show={isAddLocationVisible} onClose={handleClose} />
      <Dropdown
        className="custom-dropdown location-dropdown pencil-cursor"
        overlay={menu}
        trigger={['click']}
      >
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          {location || 'Location'}
          <FaChevronDown className="dropdown_arrow" />
        </a>
      </Dropdown>
    </div>
  );
};

export default LocationDropdown;
