/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import CustomDropdown from '../Dropdowns/CustomDropdown';
import 'antd/dist/antd.css';

const HeaderDropdown = () => {
  const { logout, currentUser } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  const menu = (
    <>
      <Link to="/settings">Settings</Link>
      <a onClick={handleLogout}>Log Out</a>
    </>
  );

  return (
    <CustomDropdown
      title={currentUser ? currentUser.displayName.split(' ')[0] : 'Hello'}
      menuItems={menu}
      type="medium"
    />
  );
};

export default HeaderDropdown;
