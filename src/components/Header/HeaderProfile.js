import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useAuth } from '../../AuthContext';
import 'antd/dist/antd.css';

const HeaderProfile = () => {
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
    <div className="header_profile">
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" href="/">
          Joel Wright
          <DownOutlined />
        </a>
      </Dropdown>
    </div>
  );
};

export default HeaderProfile;
