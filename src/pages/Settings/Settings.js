import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';

import { HiUser } from 'react-icons/hi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import SettingsHeader from './SettingsHeader';
import LocationManager from './LocationManager';
import Profile from './Profile';

const Settings = () => {
  const [selected, setSelected] = useState('Profile');

  const handleClick = (value) => {
    setSelected(value);
  };

  return (
    <>
      <SettingsHeader />
      <div className="pageContainer">
        <h2 className="settingsTitle">
          <b>Settings</b>
        </h2>
        <div className="settingsContainer">
          <div className="settingNav">
            <div className="navOptions">
              {/* Profile */}
              <div
                className={`settingNavRow navRow-${
                  selected === 'Profile' ? 'active' : 'inactive'
                }`}
                onClick={() => handleClick('Profile')}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                <HiUser size="24px" style={{ marginRight: '0.5vw' }} />
                Profile
              </div>
              {/* Location Manager */}
              <div
                className={`settingNavRow navRow-${
                  selected === 'Location' ? 'active' : 'inactive'
                }`}
                onClick={() => handleClick('Location')}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                <FaMapMarkerAlt size="23px" style={{ marginRight: '0.5vw' }} />
                Location Manager
              </div>
            </div>
            {/* Back to Dashboard */}
            <div className="settingNavRow backToDash">
              <AiFillHome size="23px" style={{ marginRight: '1vw' }} />
              <Link to="/dashboard" className="link" tabindex="-1">
                <u>Back to Dashboard</u>
              </Link>
            </div>
          </div>
          {selected === 'Profile' && <Profile />}
          {selected === 'Location' && <LocationManager />}
        </div>
      </div>
    </>
  );
};

export default Settings;
