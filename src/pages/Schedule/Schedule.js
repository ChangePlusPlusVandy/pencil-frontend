import React, { useState, useEffect } from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import { FaChevronDown } from 'react-icons/fa';
import { Dropdown } from 'antd';
import PageContainer from '../../components/PageContainer/PageContainer';
import { getSchedules } from './api-schedule';
import 'antd/dist/antd.css';
import './Schedule.css';

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [filter, setFilter] = useState('Today');
  const [loadedData, setLoadedData] = useState([]);

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
      default:
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

  const changeLoadedData = (event) => {
    // TODO: Change this to use the filter
    setFilter(event.target.innerText);
  };

  const menu = (
    <div className="dropdown_menu_transaction">
      <button type="button" onClick={changeLoadedData}>
        Today
      </button>
      <button type="button" onClick={changeLoadedData}>
        Upcoming
      </button>
      <button type="button" onClick={changeLoadedData}>
        Past
      </button>
    </div>
  );

  return (
    <PageContainer>
      <div className="tableHeaderArea">
        <h2 className="tableHeaderTitle">Schedule ({scheduleData.length})</h2>
        <div className="secondaryButton">Print Schedule</div>
        <AiFillPrinter />
        {/* <ScheduleDropdown className="schedule-dropdown" onChange={setFilter} /> */}
        <div className="dropdown">
          <Dropdown overlay={menu} trigger={['click']}>
            <button
              type="button"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {filter}
              <FaChevronDown className="dropdown_arrow" />
            </button>
          </Dropdown>
        </div>
      </div>
      <table className="itemContainer">
        <tr className="scheduleItem" id="headerContainer">
          <td className="headerCell">Time</td>
          <td className="headerCell">Name</td>
          <td className="headerCell">Pencil ID</td>
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
            const pencilId = item.teacherId;
            return (
              <div className="scheduleItem">
                <div className="timeBox">
                  <td className="timeCell">{date}</td>
                  <td className="timeCell bold">{time}</td>
                </div>
                <td className="itemCell bold">{fullName}</td>
                <td className="itemCell">{pencilId}</td>
                <td className="itemCell">{schoolName}</td>
              </div>
            );
          })}
        </tr>
      </table>
    </PageContainer>
  );
};
export default Schedule;
