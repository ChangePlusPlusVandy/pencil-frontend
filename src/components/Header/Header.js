import React, { useState } from 'react';
import './Header.css';
import { useHistory } from 'react-router-dom';
import PencilLogo from '../../assets/pencil-logo-crop.png';

import HeaderDropdown from './HeaderDropdown';
import LocationDropdown from './LocationDropdown';
import Error from '../Error/Error';

import { useAuth } from '../../AuthContext';

const Header = () => {
  const { currentLocation } = useAuth();
  const history = useHistory();
  const location = currentLocation ? `PENCIL-${currentLocation}` : 'PENCIL';

  const [error, setError] = useState(null);

  const handleNavigation = () => {
    history.push(`/`);
  };

  return (
    <div className="header">
      {error && (
        <Error
          error={error}
          description="Unable to retrieve locations. Please contact the development team."
          setError={setError}
        />
      )}

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
        <LocationDropdown setError={setError} />
        <HeaderDropdown />
      </div>
    </div>
  );
};

export default Header;
