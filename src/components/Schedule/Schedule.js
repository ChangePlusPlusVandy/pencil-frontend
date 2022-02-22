import React, { useState, Component, useEffect } from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import { getSchedules } from './api-schedule';
import './Schedule.css';
import 'antd/dist/antd.css';
import ScheduleDropdown from './ScheduleDropdown';

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [filter, setFilter] = useState('Today');

  // TEMP: Dummy data for schedule
  useEffect(() => {
    getSchedules('Nashville').then((items) => {
      setScheduleData(items);
    });
  }, []);

  const getDate = (date) => {
    const year = date.slice(0, 4);
    let month = parseInt(date.slice(5, 7), 10);
    const day = date.slice(8, 10);

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
    const finalDate = `${day} ${month} ${year}`;
    return finalDate;
  };

  const getTime = (date, end) => {
    let hours = date.slice(11, 13);
    let hours2 = end.slice(11, 13);
    const minutes = date.slice(14, 16);
    const minutes2 = end.slice(14, 16);
    let suffix = 'am';
    let suffix2 = 'am';
    if (hours > 12) {
      suffix = 'pm';
      hours -= 12;
    }
    if (hours2 > 12) {
      suffix2 = 'pm';
      hours2 -= 12;
    }
    const finalTime = `${hours}:${minutes} ${suffix} - ${hours2}:${minutes2} ${suffix2}`;
    return finalTime;
  };

  return (
    <div className="scheduleContainer">
      <div className="scheduleHeader">
        <h2 className="bold">Schedule ({scheduleData.length})</h2>
        <div className="scheduleButton">Print Schedule</div>
        <AiFillPrinter />

        {/* <select onChange={handleDropdown} className="dropdownButton">
          <option name="upcoming">Upcoming</option>
        </select> */}
        <ScheduleDropdown className="schedule-dropdown" onChange={setFilter} />
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
            const date = getDate(item.start_time);
            const time = getTime(item.end_time, item.end_time);
            return (
              <div className="scheduleItem">
                <div className="timeBox">
                  <td className="timeCell">{date}</td>
                  <td className="timeCell bold">{time}</td>
                </div>
                <td className="itemCell bold">{fullName}</td>
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
