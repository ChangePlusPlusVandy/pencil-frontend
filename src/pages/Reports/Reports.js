/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import { FaFileDownload } from 'react-icons/fa';
import 'pikaday/css/pikaday.css';
import './Reports.css';

import PageContainer from '../../components/PageContainer/PageContainer';
import TableHeader from '../../components/TableHeader/TableHeader';
import CustomDropdown from '../../components/Dropdowns/CustomDropdown';
import CalendarInput from './CalendarInput';
import FilterInput from './FilterInput';

const Reports = () => {
  const [view, setView] = useState('Weekly');
  const [fromDate, setFromDate] = useState('');
  const [untilDate, setUntilDate] = useState('');

  const menuOptions = ['Weekly', 'School', 'No Show']; // TODO: this needs to be updated

  const menu = (
    <>
      {menuOptions
        // .filter((option) => option !== view)
        .map((option) => (
          <a onClick={(e) => setView(e.target.innerText)}>{option}</a>
        ))}
    </>
  );

  const rightItems = (
    <>
      <button
        type="button"
        className="saveButton"
        id="saveButton"
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
        <div className="secondaryButton">Generate Report</div>
        <FaFileDownload size="15" />
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
      <div className="itemContainer">hi</div>
    </PageContainer>
  );
};

export default Reports;
