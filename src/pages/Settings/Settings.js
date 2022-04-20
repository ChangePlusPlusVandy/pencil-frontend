/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Settings.css';

import { HiUser } from 'react-icons/hi';
import { FaMapMarkerAlt, FaLock } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { IoSchool } from 'react-icons/io5';
import SettingsHeader from './SettingsHeader';
import LocationManager from './LocationManager';
import SchoolManager from './SchoolManager';
import Profile from './Profile';
import Password from './Password';

const Settings = () => {
  const [selected, setSelected] = useState('Profile');
  const history = useHistory();

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
                onClick={() => setSelected('Profile')}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                <HiUser size="24px" style={{ marginRight: '0.5vw' }} />
                Profile
              </div>
              {/* Password */}
              <div
                className={`settingNavRow ${
                  selected === 'Password' ? 'navRow-active' : ''
                }`}
                onClick={() => setSelected('Password')}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                <FaLock size="24px" style={{ marginRight: '0.5vw' }} />
                Password
              </div>
              {/* Location Manager */}
              <div
                className={`settingNavRow ${
                  selected === 'Location' ? 'navRow-active' : ''
                }`}
                onClick={() => setSelected('Location')}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                <FaMapMarkerAlt size="23px" style={{ marginRight: '0.5vw' }} />
                Location Manager
              </div>
              {/* School Manager */}
              <div
                className={`settingNavRow ${
                  selected === 'School' ? 'navRow-active' : ''
                }`}
                onClick={() => setSelected('School')}
                onKeyDown={() => {}}
                role="button"
                tabIndex={0}
              >
                <IoSchool size="23px" style={{ marginRight: '0.5vw' }} />
                School Manager
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
          {selected === 'Password' && <Password />}
          {selected === 'Location' && <LocationManager />}
          {selected === 'School' && <SchoolManager />}
        </div>
      </div>
    </>
  );
};

export default Settings;
