/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import { saveAs } from 'file-saver';
import { Packer } from 'docx';
import { useAuth } from '../../AuthContext';
import PageContainer from '../../components/PageContainer/PageContainer';
import { getSchedules } from './api-schedule';
import CalendarInput from '../Reports/CalendarInput';
import 'antd/dist/antd.css';
import './Schedule.css';
import TableHeader from '../../components/TableHeader/TableHeader';
import printForm from '../../utils/printSchedule';
import Error from '../../components/Error/Error';

const Schedule = () => {
  const [scheduleData, setScheduleData] = useState([]);
  const { currentLocation } = useAuth();
  const [fromDate, setFromDate] = useState('');
  const [untilDate, setUntilDate] = useState('');
  const [error, setError] = useState('');
  const [errorDescription, setErrorDescription] = useState('');

  const dateToString = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const setToday = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    setFromDate(`${month}/${day}/${year}`);
    setUntilDate(`${month}/${day}/${year}`);
  };

  const setThisWeek = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const first = new Date(today.setDate(diff));
    const last = new Date(today.setDate(diff + 6));
    setFromDate(dateToString(first));
    setUntilDate(dateToString(last));
  };

  useEffect(async () => {
    if (!fromDate) setThisWeek();
    if (!currentLocation) setError('Please select a location');
    try {
      await getSchedules(currentLocation, fromDate, untilDate).then((items) => {
        setScheduleData(items);
      });
      setError('');
      setErrorDescription('');
    } catch (err) {
      setError(err.message);
      if (err.response?.data && Object.keys(err.response?.data).length) {
        setErrorDescription(err.response?.data);
      }
    }
  }, [fromDate, untilDate]);

  const generate = () => {
    const formattedData = [];
    for (const item in scheduleData) {
      for (const teacher in scheduleData[item].ScheduleItems) {
        const start = new Date(scheduleData[item].start_date);
        const end = new Date(scheduleData[item].end_date);
        formattedData.push({
          time: `${start.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })} - ${end.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
          })}`,
          name: scheduleData[item].ScheduleItems[teacher].Teacher.name,
          pencilId: scheduleData[item].ScheduleItems[teacher].Teacher.pencilId,
          school: scheduleData[item].ScheduleItems[teacher].Teacher.School.name,
        });
      }
    }
    const doc = printForm(formattedData);
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${mm}-${dd}-${yyyy}`;
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `PencilSchedule.${today}.docx`);
    });
  };

  const getScheduleTimeSlot = (startDay, endDay, scheduleItemData) => (
    <>
      <div>{scheduleItemData.date}</div>
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
    </>
  );

  const refreshData = async () => {
    setScheduleData([]);
    try {
      await getSchedules(currentLocation, fromDate, untilDate).then((items) => {
        if (!items.err) {
          setScheduleData(items);
        }
      });
      setError('');
      setErrorDescription('');
    } catch (err) {
      setError(err.message);
      if (err.response?.data && Object.keys(err.response?.data).length) {
        setErrorDescription(err.response?.data);
      }
    }
  };

  const leftItems = (
    <div className="secondaryButton vertical-align-center" onClick={generate}>
      Print Schedule
      <AiFillPrinter />
    </div>
  );

  const rightItems = (
    <>
      <IoMdRefresh className="refreshButton" size="26" onClick={refreshData} />
      <div className="secondaryButton" onClick={setToday}>
        Today
      </div>
      <div className="secondaryButton" onClick={setThisWeek}>
        This Week
      </div>
      <CalendarInput
        fromDate={fromDate}
        setFromDate={setFromDate}
        untilDate={untilDate}
        setUntilDate={setUntilDate}
      />
    </>
  );

  return (
    <PageContainer>
      {error && (
        <Error
          error={error}
          description={errorDescription}
          setError={setError}
        />
      )}
      <>
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
            <div className="scheduleCol4">School</div>
          </div>
          {scheduleData.map((scheduleTimeSlot) => {
            if (scheduleTimeSlot.ScheduleItems.length === 0) return;

            const dataForTableItem = {
              dateAndTime: null,
              name: [],
              id: [],
              school: [],
            };

            scheduleTimeSlot.ScheduleItems.forEach(
              (scheduleItem, slotIndex) => {
                const startDay = new Date(scheduleTimeSlot.start_date);
                const endDay = new Date(scheduleTimeSlot.end_date);
                const scheduleItemData =
                  scheduleTimeSlot.ScheduleItems[slotIndex];
                // add the date to the table just once
                if (slotIndex === 0) {
                  dataForTableItem.dateAndTime = [
                    startDay,
                    endDay,
                    scheduleItemData,
                  ];
                }
                // add remaining info to the table
                dataForTableItem.name.push(scheduleItemData.Teacher.name);
                dataForTableItem.id.push(scheduleItemData.Teacher.pencilId);
                dataForTableItem.school.push(
                  scheduleItemData.Teacher.School.name
                );
              }
            );

            // eslint-disable-next-line consistent-return
            return (
              <div className="tableItem">
                <div className="scheduleCol1 timeBox">
                  {getScheduleTimeSlot(...dataForTableItem.dateAndTime)}
                </div>
                <div className="scheduleCol2 bold">
                  {dataForTableItem.name.map((teacherName) => (
                    <div>{teacherName}</div>
                  ))}
                </div>
                <div className="scheduleCol3">
                  {dataForTableItem.id.map((teacherId) => (
                    <div>{teacherId}</div>
                  ))}
                </div>
                <div className="scheduleCol4">
                  {dataForTableItem.school.map((schoolName) => (
                    <div>{schoolName}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </>
    </PageContainer>
  );
};
export default Schedule;
