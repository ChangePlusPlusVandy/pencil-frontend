import React from 'react';
import { useHistory } from 'react-router-dom';
import PencilLogo from '../../img/pencil-logo-crop.png';

import { useAuth } from '../../AuthContext';

const SettingsHeader = () => {
  const { getCurrentLocation, isSettings } = useAuth();
  const history = useHistory();
  const location = getCurrentLocation()
    ? `PENCIL-${getCurrentLocation()}`
    : 'PENCIL';

  const handleNavigation = () => {
    console.log('PRESSED');
    history.push(`/`);
  };

  return (
    <div className="header pencil-cursor">
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
    </div>
  );
};

export default SettingsHeader;
