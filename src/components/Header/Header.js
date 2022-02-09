import React from 'react';
import './Header.css';
import PencilLogo from '../../img/pencil-logo-crop.png';

import HeaderDropdown from './HeaderDropdown';

const Header = () => (
  <div className="header">
    <div className="header_left">
      <img src={PencilLogo} alt="Pencil Logo" className="header_logo" />
      <p className="header_title">PENCIL-Nashville</p>
    </div>
    <HeaderDropdown />
  </div>
);

export default Header;
