import React, { useState, Component } from 'react';
import { AiFillPrinter } from 'react-icons/ai';

import './Schedule.css';

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);

  const handleDropdown = () => {
    // handle dropdown between 'upcoming', ''
  };

  return (
    <div className="scheduleContainer">
      <div className="scheduleHeader">
        <h2>Schedule ({scheduleData.length})</h2>
        <div className="inventoryButton">Print Schedule</div>
        <AiFillPrinter />

        <select onChange={handleDropdown} className="dropdownButton">
          <option name="upcoming">Upcoming</option>
        </select>
      </div>
      <div className="itemContainer">
        <div className="containerHeader">
          <span>Time</span>
          <span>Name</span>
          <span>Phone</span>
          <span>School</span>
        </div>
      </div>
    </div>
  );
};
export default Schedule;
