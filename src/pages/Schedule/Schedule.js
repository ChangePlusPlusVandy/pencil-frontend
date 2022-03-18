/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import { useAuth } from '../../AuthContext';
import PageContainer from '../../components/PageContainer/PageContainer';
import { getSchedules } from './api-schedule';
import CustomDropdown from '../../components/Dropdowns/CustomDropdown';
import 'antd/dist/antd.css';
import './Schedule.css';
import TableHeader from '../../components/TableHeader/TableHeader';
import { parseDate } from '../../utils/timedate';

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [view, setView] = useState('Today');
  const { currentLocation } = useAuth();

  useEffect(() => {
    if (!currentLocation) alert('Please select a location');
    getSchedules(currentLocation).then((items) => {
      if (!items.err) {
        setScheduleData(items);
      }
    });
  }, []);

  const formatDate = (dateObj) => {
    const { date, month, year } = parseDate(dateObj);

    return `${date} ${month} ${year}`;
  };

  const formatTime = (startDateObj, endDateObj) => {
    const parsedStartTime = parseDate(startDateObj).ampmTime;
    const parsedEndTime = parseDate(endDateObj).ampmTime;

    return `${parsedStartTime} - ${parsedEndTime}`;
  };

  const menuOptions = ['Today', 'Upcoming', 'Past'];

  const menu = (
    <>
      {menuOptions
        .filter((option) => option !== view)
        .map((option) => (
          <a onClick={(e) => setView(e.target.innerText)}>{option}</a>
        ))}
    </>
  );

  const leftItems = (
    <>
      <div className="secondaryButton">Print Schedule</div>
      <AiFillPrinter />
    </>
  );

  const rightItems = (
    <CustomDropdown title={view} menuItems={menu} type="small" />
  );

  return (
    <PageContainer>
      <TableHeader
        title="Schedule"
        leftArea={leftItems}
        rightArea={rightItems}
      />
      <table className="itemContainer">
        <tr className="tableItem tableHeader">
          <td className="headerCell">Time</td>
          <td className="headerCell">Name</td>
          <td className="headerCell">Pencil ID</td>
          <td className="headerCell">School</td>
          <td className="headerCell">Phone Number</td>
        </tr>
        <tr>
          {scheduleData.map((item, index) => {
            // const createdAt = new Date(item.created_at);
            const fullName = item.name;
            const phoneNumber = item.phone;
            const schoolName = item.school;
            const date = formatDate(new Date(item.start_time));
            const time = formatTime(
              new Date(item.start_time),
              new Date(item.end_time)
            );
            const pencilId = 'N/A';
            return (
              <div className="tableItem">
                <div className="timeBox">
                  <td className="timeCell">{date}</td>
                  <td className="timeCell bold">{time}</td>
                </div>
                <td className="itemCell bold">{fullName}</td>
                <td className="itemCell">{pencilId}</td>
                <td className="itemCell">{schoolName}</td>
                <td className="itemCell">{phoneNumber}</td>
              </div>
            );
          })}
        </tr>
      </table>
    </PageContainer>
  );
};
export default Schedule;
