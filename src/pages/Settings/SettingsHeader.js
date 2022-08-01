import React from 'react';
import { useHistory } from 'react-router-dom';
import PencilLogo from '../../assets/pencil-logo-crop.png';

import { useAuth } from '../../AuthContext';

const SettingsHeader = () => {
  const { currentLocation } = useAuth();
  const history = useHistory();
  const location = currentLocation ? `PENCIL-${currentLocation}` : 'PENCIL';

  const handleNavigation = () => {
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
    </div>
  );
};

export default SettingsHeader;
