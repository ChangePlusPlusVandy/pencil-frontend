import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LocationManager from './LocationManager';
import './Settings.css';
import Header from '../Header/Header';

const Settings = () => {
  const a = 0;
  useEffect(() => {});

  return (
    <>
      <Header />
      <div className="settingsContainer">
        <div className="settingsHeader">
          <h2>Settings</h2>
        </div>
        <div className="settingsColumn">
          <div className="settingsItemContainer settingsNavigator">
            <div>Profile</div>
            <LocationManager />
          </div>
          <div className="settingsItemContainer settingsView">Hi</div>
        </div>
      </div>
    </>
  );
};

export default Settings;
