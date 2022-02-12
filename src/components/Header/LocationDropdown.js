/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */

import React, { useEffect, useState } from 'react';
import { Dropdown } from 'antd';
import { FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../../AuthContext';
import 'antd/dist/antd.css';

const LocationDropdown = () => {
  const { getCurrentLocation, updateLocation } = useAuth();
  const [location, setLocation] = useState(null); // User object.

  useEffect(() => {
    const currentLocation = getCurrentLocation();
    if (currentLocation) {
      setLocation(currentLocation);
    }
  }, []);

  const handleClick = (e) => {
    setLocation(e.target.innerText);
    updateLocation(e.target.innerText);
  };

  const menu = (
    <div className="dropdown_menu">
      <a onClick={handleClick}>Nashville</a>
      <a onClick={handleClick}>Antioch</a>
    </div>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {location || 'Location'}
        <FaChevronDown />
      </a>
    </Dropdown>
  );
};

export default LocationDropdown;
