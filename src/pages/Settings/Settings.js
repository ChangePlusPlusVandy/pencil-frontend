/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Settings.css';

import { HiUser } from 'react-icons/hi';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import SettingsHeader from './SettingsHeader';
import LocationManager from './LocationManager';
import Profile from './Profile';

const Settings = () => {
  const [selected, setSelected] = useState('Profile');
  const history = useHistory();

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
                className={`settingNavRow ${
                  selected === 'Profile' ? 'navRow-active' : ''
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
                className={`settingNavRow ${
                  selected === 'Location' ? 'navRow-active' : ''
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
            <div
              className="settingNavRow secondaryButton"
              onClick={() => history.push('/')}
            >
              <AiFillHome size="23px" style={{ marginRight: '8px' }} />
              Back to Dashboard
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
