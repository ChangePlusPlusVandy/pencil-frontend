/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { FaFileDownload } from 'react-icons/fa';
import 'pikaday/css/pikaday.css';
import './Reports.css';

import { IoMdRefresh } from 'react-icons/io';
import { IoFilter, IoSearch } from 'react-icons/io5';
import GeneralReport from './GeneralReport';
import ProductReport from './ProductReport';
import PageContainer from '../../components/PageContainer/PageContainer';
import CustomDropdown from '../../components/Dropdowns/CustomDropdown';
import CalendarInput from './CalendarInput';
import CustomCombobox from '../../components/Combobox/CustomCombobox';
import TableHeader from '../../components/TableHeader/TableHeader';

const menuOption = ['General', 'Product', 'No Show'];

const Reports = () => {
  const [schoolNameList, setSchoolNameList] = useState([]);
  const [view, setView] = useState('General');
  const [fromDate, setFromDate] = useState('');
  const [untilDate, setUntilDate] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [showQueries, setShowQueries] = useState(false);
  const [menuOptions, setMenuOptions] = useState(
    menuOption.filter((val) => val !== view)
  ); // TODO: this needs to be updated

  const dateToString = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
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
          }}
        >
          {option}
        </a>
      ))}
    </>
  );

  const leftItems = (
    <div className="secondaryButton vertical-align-center">
      Generate Report
      <FaFileDownload size="14" />
    </div>
  );

  const rightItems = (
    <>
      <div
        className={`searchButton vertical-align-center ${
          showQueries && 'selectedBlue'
        }`}
        onClick={() => setShowQueries(!showQueries)}
      >
        <IoSearch size="24" />
      </div>
      <IoMdRefresh className="refreshButton" size="26" />
      <CustomDropdown title={view} menuItems={menu} type="small" />
    </>
  );

  const queryItems = showQueries && (
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
          setSchoolNameList={setSchoolNameList}
        />
      );
    }
    if (reportType === 'Product') {
      return (
        <ProductReport
          fromDate={fromDate}
          untilDate={untilDate}
          schoolFilter={schoolFilter}
          setSchoolNameList={setSchoolNameList}
        />
      );
    }
    return <div>No report to show</div>;
  };

  return (
    <PageContainer>
      <TableHeader
        title="Reports"
        leftArea={leftItems}
        rightArea={rightItems}
      />
      <div className="reportsQueryArea">{queryItems}</div>
      {returnReport(view)}
    </PageContainer>
  );
};

export default Reports;
