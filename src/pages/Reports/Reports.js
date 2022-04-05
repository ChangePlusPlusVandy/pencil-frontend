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
import PageContainer from '../../components/PageContainer/PageContainer';
import CustomDropdown from '../../components/Dropdowns/CustomDropdown';
import CalendarInput from './CalendarInput';
import CustomCombobox from '../../components/Combobox/CustomCombobox';
import TableHeader from '../../components/TableHeader/TableHeader';

const Reports = () => {
  const [schoolNameList, setSchoolNameList] = useState([]);
  const [view, setView] = useState('General');
  const [fromDate, setFromDate] = useState('');
  const [untilDate, setUntilDate] = useState('');
  const [schoolFilter, setSchoolFilter] = useState('');
  const [showQueries, setShowQueries] = useState(false);

  const menuOptions = ['General', 'Product', 'No Show']; // TODO: this needs to be updated

  const menu = (
    <>
      {menuOptions.map((option) => (
        <a onClick={(e) => setView(e.target.innerText)}>{option}</a>
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
      <CalendarInput
        fromDate={fromDate}
        setFromDate={setFromDate}
        untilDate={untilDate}
        setUntilDate={setUntilDate}
      />
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

  return (
    <PageContainer>
      <TableHeader
        title="Reports"
        leftArea={leftItems}
        rightArea={rightItems}
      />
      <div className="reportsQueryArea">{queryItems}</div>
      <GeneralReport
        fromDate={fromDate}
        untilDate={untilDate}
        schoolFilter={schoolFilter}
        setSchoolNameList={setSchoolNameList}
      />
    </PageContainer>
  );
};

export default Reports;
