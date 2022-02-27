import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'antd';
import { FaChevronDown } from 'react-icons/fa';
import 'antd/dist/antd.css';

const ScheduleDropdown = ({ onChange }) => {
  const [selected, setSelected] = useState('Today');

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  const menu = (
    <div className="dropdown_menu">
      <button type="button" onClick={() => setSelected('Today')}>
        Today
      </button>
      <button type="button" onClick={() => setSelected('Upcoming')}>
        Upcoming
      </button>
      <button type="button" onClick={setSelected('Past')}>
        Past
      </button>
    </div>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <button
        type="button"
        className="ant-dropdown-link schedule-dropdown"
        onClick={(e) => e.preventDefault()}
      >
        {selected}
        <FaChevronDown />
      </button>
    </Dropdown>
  );
};

ScheduleDropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ScheduleDropdown;
