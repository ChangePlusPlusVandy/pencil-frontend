/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import { saveAs } from 'file-saver';
import { Packer } from 'docx';
import { useAuth } from '../../AuthContext';
import PageContainer from '../../components/PageContainer/PageContainer';
import { getSchedules } from './api-schedule';
import CustomDropdown from '../../components/Dropdowns/CustomDropdown';
import 'antd/dist/antd.css';
import './Schedule.css';
import TableHeader from '../../components/TableHeader/TableHeader';
import { parseDate } from '../../utils/timedate';
import printForm from '../../utils/printSchedule';

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const [view, setView] = useState('Today');
  const { currentLocation } = useAuth();

  useEffect(() => {
    if (!currentLocation) alert('Please select a location');
    getSchedules(currentLocation).then((items) => {
      console.log(items);
      if (items && !items.error) {
        setScheduleData(items);
      }
    });
  }, []);

  const generate = () => {
    console.log(scheduleData);
    // const doc = printForm(scheduleData);
    // let today = new Date();
    // const dd = String(today.getDate()).padStart(2, '0');
    // const mm = String(today.getMonth() + 1).padStart(2, '0');
    // const yyyy = today.getFullYear();
    // today = `${mm}-${dd}-${yyyy}`;
    // Packer.toBlob(doc).then((blob) => {
    //   saveAs(blob, `PencilForm.${today}.docx`);
    // });
  };

  const itemMap = () => {
    const items = [];
    for (let i = 0; i < scheduleData.length; i += 1) {
      for (let j = 0; j < scheduleData[i].ScheduleItems.length; j += 1) {
        const item = scheduleData[i].ScheduleItems[j];
        const startDay = new Date(scheduleData[i].start_date);
        const endDay = new Date(scheduleData[i].end_date);
        items.push(
          <div className="tableItem">
            <div className="scheduleCol1 timeBox">
              <div>{item.date}</div>
              <div className="bold">{startDay.toLocaleDateString('en-US')}</div>
              <div className="bold">
                {startDay.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}{' '}
                -{' '}
                {endDay.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
            <div className="scheduleCol2 bold">{item.Teacher.name}</div>
            <div className="scheduleCol3">{item.Teacher.pencilId}</div>
            <div className="scheduleCol4">{item.Teacher.phone}</div>
            <div className="scheduleCol5">{item.Teacher.School.name}</div>
          </div>
        );
      }
    }
    return items;
  };

  const refreshData = () => {
    setScheduleData([]);
    getSchedules(currentLocation).then((items) => {
      if (!items.err) {
        setScheduleData(items);
      }
    });
  };

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
    <div className="secondaryButton vertical-align-center">
      Print Schedule
      <AiFillPrinter />
    </div>
  );

  const rightItems = (
    <>
      <IoMdRefresh className="refreshButton" size="26" onClick={refreshData} />
      <CustomDropdown title={view} menuItems={menu} type="small" />
    </>
  );

  return (
    <PageContainer>
      <TableHeader
        title="Schedule"
        leftArea={leftItems}
        rightArea={rightItems}
      />
      <div className="tableContainer">
        <div className="tableItemHeader">
          <div className="scheduleCol1">Date/Time</div>
          <div className="scheduleCol2">Name</div>
          <div className="scheduleCol3">Pencil ID</div>
          <div className="scheduleCol4">Phone Number</div>
          <div className="scheduleCol5">School</div>
        </div>
        {itemMap()}
      </div>
    </PageContainer>
  );
};
export default Schedule;
