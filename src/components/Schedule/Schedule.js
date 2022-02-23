import React, { useState, Component, useEffect } from 'react';
import { AiFillPrinter } from 'react-icons/ai';

import Menu from '../Menu/Menu';
import Header from '../Header/Header';
import './Schedule.css';

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);

  // TEMP: Dummy data for schedule
  useEffect(() => {
    setScheduleData([
      {
        name: 'ziiii',
        email: 'zii@gmaill.com',
        uri: 'https://api.calendly.com/scheduled_events/47d95d12-ccb4-48f5-a0fe-4be771121cc1/invitees/c9ac5221-b9cd-4466-9980-e0b786a3fa57',
        school: 'some school',
        phone: '+1 615-888-8888',
        start_time: '2022-02-21T15:15:00.000000Z',
        end_time: '2022-02-21T15:30:00.000000Z',
      },
      {
        name: 'kevin jin',
        email: 'kevin@gmaill.com',
        uri: 'https://api.calendly.com/scheduled_events/47d95d12-ccb4-48f5-a0fe-4be771121cc1/invitees/c9ac5221-b9cd-4466-9980-e0b786a3fa57',
        school: 'harvard college',
        phone: '+1 615-555-5555',
        start_time: '2022-02-21T15:35:00.000000Z',
        end_time: '2022-02-21T15:45:00.000000Z',
      },
    ]);
  }, []);

  const handleDropdown = () => {
    // handle dropdown between 'upcoming', ''
  };

  return (
    <>
      <Header />
      <Menu />
      <div className="scheduleContainer">
        <div className="scheduleContainerHeader">
          <h2>Schedule ({scheduleData.length})</h2>
          <div className="scheduleButton">Print Schedule</div>
          <AiFillPrinter />

          <select onChange={handleDropdown} className="dropdownButton">
            <option name="upcoming">Upcoming</option>
          </select>
        </div>
        <div className="scheduleItemContainer">
          <div className="scheduleContainerHeader">
            <span>Time</span>
            <span>Name</span>
            <span>Phone</span>
            <span>School</span>
          </div>
          <div className="itemContainer">
            <div className="containerHeader">
              <span>Time</span>
              <span>Name</span>
              <span>Phone</span>
              <span>School</span>
            </div>
            <ul className="scheduleList">
              {scheduleData.map((item, index) => {
                // const createdAt = new Date(item.created_at);
                const fullName = item.name;
                const phoneNumber = item.phone;
                const schoolName = item.school;
                return (
                  <div className="scheduleItem">
                    <div className="scheduleTime">
                      {/* <div>{createdAt.toDateString()}</div> */}
                      {/* <div>{createdAt.toLocaleTimeString()}</div> */}
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
      </div>
    </>
  );
};
export default Schedule;
