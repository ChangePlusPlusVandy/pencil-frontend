/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { useAuth } from '../../AuthContext';

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
    <Menu>
      <Menu.Item key="0">
        <a href="https://www.antgroup.com">Profile</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a href={handleLogout}>Log Out</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="header_dropdown">
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          {user && user.displayName}
          <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};

export default HeaderDropdown;
