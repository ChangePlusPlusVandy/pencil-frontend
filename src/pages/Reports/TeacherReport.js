/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../AuthContext';
import { getTeacherReport } from './api-reports';
import './TeacherReport.css';

const TeacherReport = ({
  fromDate,
  untilDate,
  schoolFilter,
  setError,
  setErrorDescription,
}) => {
  const { currentLocation } = useAuth();
  const [reportData, setReportData] = useState([]);

  useEffect(async () => {
    try {
      await getTeacherReport(
        fromDate,
        untilDate,
        schoolFilter,
        currentLocation
      ).then((data) => {
        setReportData([]);
        setReportData(data);
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
      <div className="tableItemHeader">
        <div className="teacherReportCol1">Teacher Name</div>
        <div className="teacherReportCol2">School</div>
        <div className="teacherReportCol3">No. Times Shopped</div>
      </div>
      <div>
        {reportData?.reportBody?.map((teacher) => (
          <div className="tableItem">
            <div className="teacherReportCol1">{teacher.name}</div>
            <div className="teacherReportCol2">{teacher.schoolName}</div>
            <div className="teacherReportCol3">{teacher.timesShopped}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherReport;

TeacherReport.propTypes = {
  fromDate: PropTypes.string,
  untilDate: PropTypes.string,
  schoolFilter: PropTypes.string,
  setError: PropTypes.func.isRequired,
  setErrorDescription: PropTypes.func.isRequired,
};

TeacherReport.defaultProps = {
  fromDate: '',
  untilDate: '',
  schoolFilter: '',
};
