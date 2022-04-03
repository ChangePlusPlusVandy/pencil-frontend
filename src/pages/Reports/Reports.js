/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/no-unresolved */
import React, { useState, useEffect } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import 'pikaday/css/pikaday.css';
import './Reports.css';

import { IoMdRefresh } from 'react-icons/io';
import PageContainer from '../../components/PageContainer/PageContainer';
import CustomDropdown from '../../components/Dropdowns/CustomDropdown';
import CalendarInput from './CalendarInput';
import FilterInput from './FilterInput';
import { getReport1 } from './api-reports';
import { parseDate } from '../../utils/timedate';

const Reports = () => {
  const [reportData, setReportData] = useState([]);
  const [reportSummary, setReportSummary] = useState({});
  const [view, setView] = useState('Weekly');
  const [fromDate, setFromDate] = useState('');
  const [untilDate, setUntilDate] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');

  useEffect(() => {
    getReport1(fromDate, untilDate, schoolFilter).then((data) => {
      if (data && !data.error) {
        setReportData(data.transactions);
        setReportSummary(data.summary);
      }
    });
  }, [fromDate, untilDate, schoolFilter]);

  const formatDate = (dateObj) => {
    const { date, month, year } = parseDate(dateObj);

    return `${date} ${month} ${year}`;
  };

  const menuOptions = ['Weekly', 'School', 'No Show']; // TODO: this needs to be updated

  const menu = (
    <>
      {menuOptions.map((option) => (
        <a onClick={(e) => setView(e.target.innerText)}>{option}</a>
      ))}
    </>
  );

  const rightItems = (
    <>
      <IoMdRefresh className="refreshButton" size="26" />
      <button
        type="button"
        className="primaryButton"
        // disabled={}
        // onClick={}
      >
        View Stats
      </button>
      <CustomDropdown title={view} menuItems={menu} type="small" />
    </>
  );

  return (
    <PageContainer>
      <div className="reportsHeader">
        <div className="tableHeaderTitle">Reports</div>
        <div className="secondaryButton vertical-align-center">
          Generate Report
          <FaFileDownload size="14" />
        </div>
      </div>
      <div className="reportsHeaderArea">
        <div className="reportsHeaderLeft">
          <CalendarInput
            fromDate={fromDate}
            setFromDate={setFromDate}
            untilDate={untilDate}
            setUntilDate={setUntilDate}
          />

          <FilterInput />
        </div>
        <div className="tableHeaderRight">{rightItems}</div>
      </div>
      <div className="tableContainer">
        <div className="tableItemHeader">
          <div className="scheduleCol1">Date</div>
          <div className="scheduleCol2">Teacher Name</div>
          <div className="scheduleCol3">Email</div>
          <div className="scheduleCol4">School</div>
          <div className="scheduleCol5">Total Product Value</div>
        </div>
        <div>
          {reportData.map((transaction) => {
            const date = formatDate(new Date(transaction.createdAt));
            const { firstName, lastName, email } = transaction.Teacher;
            const schoolName = transaction.School.name;
            return (
              <div className="tableItem">
                <div className="scheduleCol1">{date}</div>
                <div className="scheduleCol2">{`${firstName} ${lastName}`}</div>
                <div className="scheduleCol3">{email}</div>
                <div className="scheduleCol4">{schoolName}</div>
                <div className="scheduleCol5">{transaction.totalItemPrice}</div>
              </div>
            );
          })}
        </div>
      </div>
    </PageContainer>
  );
};

export default Reports;
