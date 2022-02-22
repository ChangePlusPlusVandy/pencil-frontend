import React from 'react';
import './Header.css';
import PencilLogo from '../../img/pencil-logo-crop.png';

import HeaderDropdown from './HeaderDropdown';
import LocationDropdown from './LocationDropdown';

import { useAuth } from '../../AuthContext';

const Header = () => {
  const { getCurrentLocation, isSettings } = useAuth();
  const location = getCurrentLocation()
    ? `PENCIL-${getCurrentLocation()}`
    : 'PENCIL';

  return (
    <div className="header pencil-cursor">
      <div className="header_left">
        <img src={PencilLogo} alt="Pencil Logo" className="header_logo" />
        <p className="header_title">{location}</p>
      </div>
      {!isSettings && (
        <div className="header_right">
          <LocationDropdown />
          <HeaderDropdown />
        </div>
      )}
    </div>
  );
};

export default Header;
