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

  const dateConverter = (date) => {
    const year = date.slice(0, 4);
    let month = parseInt(date.slice(5, 7), 10);
    const day = date.slice(8, 10);
    let hours = date.slice(11, 13);
    const minutes = date.slice(14, 16);
    let suffix = 'am';
    // eslint-disable-next-line default-case
    switch (month) {
      case 1:
        month = 'Jan';
        break;
      case 2:
        month = 'Feb';
        break;
      case 3:
        month = 'Mar';
        break;
      case 4:
        month = 'Apr';
        break;
      case 5:
        month = 'May';
        break;
      case 6:
        month = 'June';
        break;
      case 7:
        month = 'July';
        break;
      case 8:
        month = 'Aug';
        break;
      case 9:
        month = 'Sept';
        break;
      case 10:
        month = 'Oct';
        break;
      case 11:
        month = 'Nov';
        break;
      case 12:
        month = 'Dec';
        break;
    }
    if (hours > 12) {
      suffix = 'pm';
      hours -= 12;
    }
    return `${day} ${month} ${year}\n${hours}:${minutes} ${suffix}`;
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
            const startTime = dateConverter(item.start_time);
            const endTime = dateConverter(item.end_time);
            return (
              <div className="scheduleItem">
                <div className="timeBox">
                  <td className="timeCell">{startTime}</td>
                  <td className="timeCell">{endTime}</td>
                </div>
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
