import React, { useState, Component, useEffect } from 'react';
import { AiFillPrinter } from 'react-icons/ai';

import './Schedule.css';

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);

  // TEMP: Dummy data for schedule
  useEffect(() => {
    setScheduleData([
      // entry 1
      {
        startdate: 1644775200,
        enddate: 1644776100,
        email: 'zi@gmail.com',
        firstname: 'Zi',
        lastname: 'T',
        phone: '6155555555',
        customfields: [
          {
            customfieldid: 3865500,
            id: 3865500,
            value: 'Vanderbilt High School for Rock Climbing Enthusiasts',
          },
        ],
      },
      {
        startdate: 1644777000,
        enddate: 1644777900,
        email: 'intiser@gmail.com',
        firstname: 'Intiser',
        lastname: 'Mr Microsoft',
        phone: '12341234222',
        customfields: [
          {
            customfieldid: 3865500,
            id: 3865500,
            value: 'Harvard Elementary School for Bangladesh Scholars',
          },
        ],
      },
      // entry 2
    ]);
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
      <div className="itemContainer">
        <div className="containerHeader">
          <span>Time</span>
          <span>Name</span>
          <span>Phone</span>
          <span>School</span>
        </div>
        <ul className="dragList">
          {scheduleData.map((item, index) => {
            const startDate = new Date(item.startdate * 1000);
            const endDate = new Date(item.enddate * 1000);
            const fullName = `${item.firstname} ${item.lastname}`;
            const phoneNumber = item.phone;
            const schoolName = item.customfields[0].value;
            return (
              <div className="scheduleItem">
                <div className="scheduleTime">
                  <div>{startDate.toDateString()}</div>
                  <div>
                    {startDate
                      .toLocaleTimeString()
                      .replace(/(.*)\D\d+/, '$1')
                      .toLowerCase()}{' '}
                    -{' '}
                    {endDate
                      .toLocaleTimeString()
                      .replace(/(.*)\D\d+/, '$1')
                      .toLowerCase()}
                  </div>
                </div>
                <div>{fullName}</div>
                <div>{phoneNumber}</div>
                <div>{schoolName}</div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default Schedule;
