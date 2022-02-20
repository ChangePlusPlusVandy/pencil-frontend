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
import 'antd/dist/antd.css';

const LocationDropdown = () => {
  const { getCurrentLocation, updateLocation } = useAuth();
  const [location, setLocation] = useState();
  const [allLocations, setAllLocations] = useState([{ name: 'Location' }]);

  const handleClick = (e) => {
    setLocation(e.target.innerText);
    updateLocation(e.target.innerText);
  };

  const handleAddLocation = () => {
    console.log('Add location');
  };

  useEffect(() => {
    getAllLocations().then((res) => {
      setAllLocations(res);
    });
    const currentLocation = getCurrentLocation();
    if (currentLocation) {
      setLocation(currentLocation);
    }
  }, []);

  const menu = (
    <div className="dropdown_menu">
      {allLocations.map((loc) => (
        <a onClick={handleClick}>{loc.name}</a>
      ))}
      <div className="horizontal_line" />
      <a className="addLocationButton" onClick={handleAddLocation}>
        Add Location <TiPlus style={{ marginLeft: '2px' }} />
      </a>
    </div>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {location || 'Location'}
        <FaChevronDown className="dropdown_arrow" />
      </a>
    </Dropdown>
  );
};

export default LocationDropdown;
