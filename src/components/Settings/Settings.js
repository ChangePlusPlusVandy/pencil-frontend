/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';

import { HiUser } from 'react-icons/hi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import SettingsHeader from './SettingsHeader';
import LocationManager from './LocationManager';

const Settings = () => {
  const [selected, setSelected] = useState('Profile');

  const handleClick = (value) => {
    setSelected(value);
  };

  return (
    <div>
      <SettingsHeader />
      <h2 className="settingsTitle">
        <b>Settings</b>
      </h2>
      <div className="settingsContainer">
        <div className="settingNav">
          <div className="navOptions">
            <div
              className={`settingNavRow navRow-${
                selected === 'Profile' ? 'active' : 'inactive'
              }`}
              onClick={() => handleClick('Profile')}
            >
              <HiUser size="24px" style={{ marginRight: '1vw' }} />
              Profile
            </div>
            <div
              className={`settingNavRow navRow-${
                selected === 'Location' ? 'active' : 'inactive'
              }`}
              onClick={() => handleClick('Location')}
            >
              <FaMapMarkerAlt size="23px" style={{ marginRight: '1vw' }} />
              Location Manager
            </div>
          </div>
          <div className="settingNavRow backToDash">
            <AiFillHome size="23px" style={{ marginRight: '1vw' }} />
            <Link to="/dashboard" className="link" tabindex="-1">
              <u>Back to Dashboard</u>
            </Link>
          </div>
        </div>
        <LocationManager />
      </div>
    </div>
  );
};

export default Settings;
