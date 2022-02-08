import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../AuthContext';

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

  // const menu = (
  // <Menu>
  //   <Menu.Item key="0">
  //     <a href="https://www.antgroup.com">Profile</a>
  //   </Menu.Item>
  //   <Menu.Item key="1">
  //     <a href={handleLogout}>Log Out</a>
  //   </Menu.Item>
  // </Menu>
  // );

  return (
    <div className="header_profile">
      {/* <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" href="/">
          Joel Wright
          <DownOutlined />
        </a>
      </Dropdown> */}
      Joel Wright
    </div>
  );
};

export default HeaderProfile;
