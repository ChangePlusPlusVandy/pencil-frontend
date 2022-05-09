/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../AuthContext';
import { getReport3 } from './api-reports';
import { formatDateDMY } from '../../utils/timedate';
import './NoShowReport.css';

const NoShowReport = ({
  fromDate,
  untilDate,
  schoolFilter,
  setSchoolNameList,
  setError,
  setErrorDescription,
}) => {
  const { currentLocation } = useAuth();
  const [reportData, setReportData] = useState([]);

  useEffect(async () => {
    let schoolUuid = '';
    if (schoolFilter && reportData) {
      reportData.forEach((item) => {
        if (item.School.name === schoolFilter) schoolUuid = item.School.uuid;
      });
    }
    try {
      await getReport3(fromDate, untilDate, schoolUuid, currentLocation).then(
        (data) => {
          console.log(data);
          setReportData(data.noShowList);
          // generate list of unique school names
          const schoolList = data.noShowList
            ? data.noShowList.map((item) => item.school)
            : [];
          setSchoolNameList([...new Set(schoolList)]);
        }
      );
    } catch (err) {
      setError(err.message);
      if (err.response?.data && Object.keys(err.response.data).length) {
        setErrorDescription(err.response.data);
      }
    }
  }, [fromDate, untilDate, schoolFilter]);

  return (
    <div className="tableContainer">
      <div className="tableItemHeader">
        <div className="NoShowReportCol1">Teacher Name</div>
        <div className="NoShowReportCol2">Email</div>
        <div className="NoShowReportCol3">School</div>
      </div>
      <div>
        {reportData &&
          reportData.map((teacher) => {
            // const date = formatDateDMY(new Date(teacher.createdAt));
            const { name, email, school } = teacher;
            return (
              <div className="tableItem">
                {/* <div className="NoShowReportCol1">{date}</div> */}
                <div className="NoShowReportCol1">{name}</div>
                <div className="NoShowReportCol2">{email}</div>
                <div className="NoShowReportCol3">{school}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default NoShowReport;

NoShowReport.propTypes = {
  fromDate: PropTypes.string,
  untilDate: PropTypes.string,
  schoolFilter: PropTypes.string,
  setSchoolNameList: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  setErrorDescription: PropTypes.func.isRequired,
};

NoShowReport.defaultProps = {
  fromDate: '',
  untilDate: '',
  schoolFilter: '',
};
