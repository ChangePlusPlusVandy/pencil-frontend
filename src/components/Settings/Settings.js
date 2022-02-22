import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Settings.css';

const Settings = () => {
  const a = 0;
  useEffect(() => {});

  return (
    <div className="settingsContainer">
      <div className="settingsHeader">
        <h2>Settings</h2>
      </div>
      <div className="settingsColumn">
        <div className="settingsItemContainer settingsNavigator">
          <div>Profile</div>
          <div>Location Manager</div>
        </div>
        <div className="settingsItemContainer settingsView">Hi</div>
      </div>
    </div>
  );
};

export default Settings;
