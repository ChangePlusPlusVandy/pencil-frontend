import React, { useState, Component } from 'react';
import { AiFillPrinter } from 'react-icons/ai';

import './Schedule.css';

const Schedule = () => {
  const [changed, setChanged] = useState(false);
  return (
    <div className="scheduleContainer">
      <div className="scheduleHeader">
        <h2>Schedule</h2>
        <div className="scheduleButton">Print Schedule</div>
        <AiFillPrinter />
      </div>
    </div>
  );
};
export default Schedule;
