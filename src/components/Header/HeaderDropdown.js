/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown } from 'antd';
import { FaChevronDown } from 'react-icons/fa';
import { useAuth } from '../../AuthContext';
import 'antd/dist/antd.css';

const HeaderDropdown = () => {
  const { logout, getUser } = useAuth();
  const history = useHistory();
  const [user, setUser] = useState(null); // User object.

  useEffect(() => {
    const currentUser = getUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  const menu = (
    <div className="dropdown_menu">
      <a href="https://www.antgroup.com">Profile</a>
      <a href={handleLogout}>Log Out</a>
    </div>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {user && user.displayName}
        <FaChevronDown />
      </a>
    </Dropdown>
  );
};

export default HeaderDropdown;
