import React, { useState, Component, useEffect } from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import { getSchedules } from './api-schedule';
import './Schedule.css';
import 'antd/dist/antd.css';

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);

  // TEMP: Dummy data for schedule
  useEffect(() => {
    getSchedules('Nashville').then((items) => {
      console.log('HERE again', items);
      setScheduleData(items);
    });
  }, []);

  const handleDropdown = () => {
    // handle dropdown between 'upcoming', ''
  };

  return (
    <div className="scheduleContainer">
      <div className="scheduleHeader">
        <h2>Schedule ({scheduleData.length})</h2>
        <div className="scheduleButton">Print Schedule</div>
        <AiFillPrinter />

        <select onChange={handleDropdown} className="dropdownButton">
          <option name="upcoming">Upcoming</option>
        </select>
      </div>
      <table className="itemContainer">
        <tr className="scheduleItem" id="headerContainer">
          <td className="headerCell">Time</td>
          <td className="headerCell">Name</td>
          <td className="headerCell">Phone</td>
          <td className="headerCell">School</td>
        </tr>
        <tr>
          {scheduleData.map((item, index) => {
            // const createdAt = new Date(item.created_at);
            const fullName = item.name;
            const phoneNumber = item.phone;
            const schoolName = item.school;
            return (
              <div className="scheduleItem">
                <td className="itemCell">hi</td>
                <td className="itemCell">{fullName}</td>
                <td className="itemCell">{phoneNumber}</td>
                <td className="itemCell">{schoolName}</td>
              </div>
            );
          })}
        </tr>
      </table>
    </div>
  );
};
export default Schedule;
