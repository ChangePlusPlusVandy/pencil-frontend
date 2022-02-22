/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import { Menu, Dropdown } from 'antd';
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
    <div className="dropdown_menu pencil-cursor">
      <Link to="/settings" className="pencil-cursor">
        Settings
      </Link>
      <a className="pencil-cursor" onClick={handleLogout}>
        Log Out
      </a>
    </div>
  );

  return (
    <Dropdown
      className="custom-dropdown pencil-cursor"
      overlay={menu}
      trigger={['click']}
    >
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {user && user.displayName.split(' ')[0]}
        <FaChevronDown className="dropdown_arrow" />
      </a>
    </Dropdown>
  );
};

export default HeaderDropdown;
