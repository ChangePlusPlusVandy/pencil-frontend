import React from 'react';
import './Header.css';
import { useHistory } from 'react-router-dom';
import PencilLogo from '../../assets/pencil-logo-crop.png';

import HeaderDropdown from './HeaderDropdown';
import LocationDropdown from './LocationDropdown';

import { useAuth } from '../../AuthContext';

const Header = () => {
  const { currentLocation } = useAuth();
  const history = useHistory();
  const location = currentLocation ? `PENCIL-${currentLocation}` : 'PENCIL';

  const handleNavigation = () => {
    console.log('PRESSED');
    history.push(`/`);
  };

  return (
    <div className="header">
      <div
        className="header_left"
        onKeyPress={() => {}}
        role="button"
        tabIndex={0}
        onClick={handleNavigation}
      >
        <img src={PencilLogo} alt="Pencil Logo" className="header_logo" />
        <p className="header_title">{location}</p>
      </div>
      <div className="header_right">
        <LocationDropdown />
        <HeaderDropdown />
      </div>
    </div>
  );
};

export default Header;
