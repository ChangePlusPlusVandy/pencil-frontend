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
        <tr className="containerHeader">
          <th>Time</th>
          <th>Name</th>
          <th>Phone</th>
          <th>School</th>
        </tr>
        <tr className="scheduleList">
          {scheduleData.map((item, index) => {
            // const createdAt = new Date(item.created_at);
            const fullName = item.name;
            const phoneNumber = item.phone;
            const schoolName = item.school;
            return (
              <div className="scheduleItem">
                <div className="scheduleTime">hi</div>
                <td>{fullName}</td>
                <td>{phoneNumber}</td>
                <td>{schoolName}</td>
              </div>
            );
          })}
        </tr>
      </table>
    </div>
  );
};
export default Schedule;
