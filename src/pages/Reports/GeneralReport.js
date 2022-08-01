/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../AuthContext';
import { getGeneralReport } from './api-reports';
import { formatDateDMY } from '../../utils/timedate';
import './GeneralReport.css';

const GeneralReport = ({
  fromDate,
  untilDate,
  schoolFilter,
  setError,
  setErrorDescription,
}) => {
  const { currentLocation } = useAuth();
  const [reportData, setReportData] = useState([]);
  const [reportSummary, setReportSummary] = useState({
    totalSignups: 0,
    numUniqueTeachers: 0,
    totalValue: 0,
  });

  useEffect(async () => {
    try {
      await getGeneralReport(
        fromDate,
        untilDate,
        schoolFilter,
        currentLocation
      ).then((data) => {
        setReportData([]);
        setReportData(data.reportBody);
        setReportSummary(data.reportStats);
        // generate list of unique school names
      });
    } catch (err) {
      setError(err.message);
      if (err.response?.data && Object.keys(err.response?.data).length) {
        setErrorDescription(err.response?.data);
      }
    }
  }, [fromDate, untilDate, schoolFilter]);

  return (
    <div className="tableContainer">
      {reportSummary && (
        <div className="reportSummary">
          <p>
            <p className="blueText">{reportSummary.totalSignups}</p>Total
            Signups
          </p>
          <p>
            <p className="blueText">{reportSummary.numUniqueTeachers}</p>Unique
            Teachers
          </p>
          <p>
            <p className="blueText">
              ${(Math.round(reportSummary.totalValue * 100) / 100).toFixed(2)}
            </p>
            Amount Taken
          </p>
        </div>
      )}
      <div className="tableItemHeader">
        <div className="generalReportCol1">Date</div>
        <div className="generalReportCol2">Teacher Name</div>
        <div className="generalReportCol3">Email</div>
        <div className="generalReportCol4">School</div>
        <div className="generalReportCol5">Total Product Value</div>
      </div>
      <div>
        {reportData?.map((transaction) => {
          const date = formatDateDMY(new Date(transaction.createdAt));
          const { name, email } = transaction.Teacher;
          const schoolName = transaction.School.name;
          return (
            <div className="tableItem">
              <div className="generalReportCol1">{date}</div>
              <div className="generalReportCol2">{name}</div>
              <div className="generalReportCol3">{email}</div>
              <div className="generalReportCol4">{schoolName}</div>
              <div className="generalReportCol5">
                ${' '}
                {(Math.round(transaction.totalItemPrice * 100) / 100).toFixed(
                  2
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GeneralReport;

GeneralReport.propTypes = {
  fromDate: PropTypes.string,
  untilDate: PropTypes.string,
  schoolFilter: PropTypes.string,
  setError: PropTypes.func.isRequired,
  setErrorDescription: PropTypes.func.isRequired,
};

GeneralReport.defaultProps = {
  fromDate: '',
  untilDate: '',
  schoolFilter: '',
};
