/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'antd';
import { FaChevronDown } from 'react-icons/fa';
import 'antd/dist/antd.css';

// eslint-disable-next-line react/prop-types
const ScheduleDropdown = ({ onChange }) => {
  const [selected, setSelected] = useState('Today');

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  const menu = (
    <div className="dropdown_menu">
      <a onClick={() => setSelected('Today')}>Today</a>
      <a onClick={() => setSelected('Upcoming')}>Upcoming</a>
      <a onClick={setSelected('Past')}>Past</a>
    </div>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <a
        className="ant-dropdown-link schedule-dropdown"
        onClick={(e) => e.preventDefault()}
      >
        {selected}
        <FaChevronDown />
      </a>
    </Dropdown>
  );
};

export default ScheduleDropdown;
