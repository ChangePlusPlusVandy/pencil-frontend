/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import 'pikaday/css/pikaday.css';
import './Reports.css';

import { IoFilter } from 'react-icons/io5';
import Error from '../../components/Error/Error';
import GeneralReport from './GeneralReport';
import ProductReport from './ProductReport';
import NoShowReport from './NoShowReport';
import PageContainer from '../../components/PageContainer/PageContainer';
import CustomDropdown from '../../components/Dropdowns/CustomDropdown';
import CalendarInput from './CalendarInput';
import CustomCombobox from '../../components/Combobox/CustomCombobox';
import TableHeader from '../../components/TableHeader/TableHeader';
import { getSchools, printWeeklyReport } from './api-reports';
import SchoolsReport from './SchoolsReport';
import { useAuth } from '../../AuthContext';
import TeacherReport from './TeacherReport';

const menuOption = ['General', 'Teachers', 'Schools', 'Product', 'No Show'];

const Reports = () => {
  const [schoolNameList, setSchoolNameList] = useState([]);
  const [view, setView] = useState('General');
  const [fromDate, setFromDate] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [error, setError] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [untilDate, setUntilDate] = useState('');
  const [menuOptions, setMenuOptions] = useState(
    menuOption.filter((val) => val !== view)
  ); // TODO: this needs to be updated
  const { currentLocation } = useAuth();

  const dateToString = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(async () => {
    try {
      await getSchools().then((data) => {
        setSchoolNameList(data.map((item) => item.name));
      });
    } catch (err) {
      setError(err.message);
      if (err.response?.data && Object.keys(err.response?.data).length) {
        setErrorDescription(err.response?.data);
      }
    }
  }, []);

  const setThisWeek = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const first = new Date(today.setDate(diff));
    const last = new Date(today.setDate(diff + 6));
    setFromDate(dateToString(first));
    setUntilDate(dateToString(last));
  };

  const setThisMonth = () => {
    const today = new Date();
    const first = new Date(today.getFullYear(), today.getMonth(), 1);
    const last = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    setFromDate(dateToString(first));
    setUntilDate(dateToString(last));
  };

  const menu = (
    <>
      {menuOptions.map((option) => (
        <a
          onClick={(e) => {
            setMenuOptions(
              menuOption.filter((menuO) => menuO !== e.target.innerText)
            );
            setView(e.target.innerText);
            setError('');
            setErrorDescription('');
          }}
        >
          {option}
        </a>
      ))}
    </>
  );

  const leftItems = (
    <div
      className="secondaryButton vertical-align-center"
      onClick={() =>
        printWeeklyReport(
          fromDate,
          untilDate,
          schoolFilter,
          currentLocation,
          view
        )
      }
    >
      Generate Report
      <FaFileDownload size="14" />
    </div>
  );

  const rightItems = (
    <CustomDropdown title={view} menuItems={menu} type="small" />
  );

  const queryItems = (
    <>
      <div className="vertical-align-center">
        <CalendarInput
          fromDate={fromDate}
          setFromDate={setFromDate}
          untilDate={untilDate}
          setUntilDate={setUntilDate}
        />
        <div className="secondaryButton" onClick={setThisWeek}>
          This Week
        </div>
        <div className="secondaryButton" onClick={setThisMonth}>
          This Month
        </div>
      </div>
      <CustomCombobox
        data={schoolNameList}
        onChange={setSchoolFilter}
        size="small"
        placeholder="Search by school"
        icon={
          <IoFilter
            size="16"
            className={`${schoolFilter !== '' && 'selectedBlue'}`}
          />
        }
      />
    </>
  );

  const returnReport = (reportType) => {
    if (reportType === 'General') {
      return (
        <GeneralReport
          fromDate={fromDate}
          untilDate={untilDate}
          schoolFilter={schoolFilter}
          schoolNameList={schoolNameList}
          setError={setError}
          setErrorDescription={setErrorDescription}
        />
      );
    }
    if (reportType === 'Teachers') {
      return (
        <TeacherReport
          fromDate={fromDate}
          untilDate={untilDate}
          schoolFilter={schoolFilter}
          schoolNameList={schoolNameList}
          setError={setError}
          setErrorDescription={setErrorDescription}
        />
      );
    }
    if (reportType === 'Product') {
      return (
        <ProductReport
          fromDate={fromDate}
          untilDate={untilDate}
          schoolFilter={schoolFilter}
          schoolNameList={schoolNameList}
          setError={setError}
          setErrorDescription={setErrorDescription}
        />
      );
    }
    if (reportType === 'No Show') {
      return (
        <NoShowReport
          fromDate={fromDate}
          untilDate={untilDate}
          schoolFilter={schoolFilter}
          schoolNameList={schoolNameList}
          setError={setError}
          setErrorDescription={setErrorDescription}
        />
      );
    }
    if (reportType === 'Schools') {
      return (
        <SchoolsReport
          fromDate={fromDate}
          untilDate={untilDate}
          schoolFilter={schoolFilter}
          schoolNameList={schoolNameList}
          setError={setError}
          setErrorDescription={setErrorDescription}
        />
      );
    }
    return <div>No report to show</div>;
  };

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
          title="Reports"
          leftArea={leftItems}
          rightArea={rightItems}
        />
        <div className="reportsQueryArea">{queryItems}</div>
        {returnReport(view)}
      </>
    </PageContainer>
  );
};

export default Reports;
