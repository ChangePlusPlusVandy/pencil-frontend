/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'antd';
import { FaChevronDown } from 'react-icons/fa';
import './CustomDropdown.css';
import 'antd/dist/antd.css';

const CustomDropdown = ({ title, menuItems, type }) => {
  const menu = <div className={`dropdown_menu ${type}`}>{menuItems}</div>;

  return (
    <Dropdown
      className={`custom-dropdown ${type}`}
      overlay={menu}
      trigger={['click']}
    >
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        {title}
        <FaChevronDown className="dropdown_arrow" />
      </a>
    </Dropdown>
  );
};

export default CustomDropdown;

CustomDropdown.propTypes = {
  title: PropTypes.string.isRequired,
  menuItems: PropTypes.element,
  type: PropTypes.string.isRequired,
};

CustomDropdown.defaultProps = {
  menuItems: null,
};
