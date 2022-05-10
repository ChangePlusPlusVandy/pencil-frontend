/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../AuthContext';
import { getReport3 } from './api-reports';
// import { formatDateDMY } from '../../utils/timedate';
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
  const [noShowRate, setNoShowRate] = useState(0);

  useEffect(async () => {
    let schoolUuid = '';
    if (schoolFilter && reportData) {
      reportData.forEach((item) => {
        if (item.school === schoolFilter) schoolUuid = item.schooluuid;
      });
    }
    try {
      await getReport3(fromDate, untilDate, schoolUuid, currentLocation).then(
        (data) => {
          setReportData(data.noShowList);
          // generate list of unique school names
          const schoolList = data.noShowList
            ? data.noShowList.map((item) => item.school)
            : [];
          setSchoolNameList([...new Set(schoolList)]);
          setNoShowRate(data.noShowRate);
        }
      );
    } catch (err) {
      setError(err.message);
      if (err.response?.data && Object.keys(err.response?.data).length) {
        setErrorDescription(err.response?.data);
      }
    }
  }, [fromDate, untilDate, schoolFilter]);

  return (
    <div className="tableContainer">
      {noShowRate && (
        <div className="reportSummary">
          <p>
            <p className="blueText">{noShowRate}%</p>No Show Rate
          </p>
        </div>
      )}
      <div className="tableItemHeader">
        <div className="NoShowReportCol1">Time/Date</div>
        <div className="NoShowReportCol2">Teacher Name</div>
        <div className="NoShowReportCol3">Email</div>
        <div className="NoShowReportCol4">School</div>
      </div>
      <div>
        {reportData &&
          reportData.map((teacher) => {
            // const date = formatDateDMY(new Date(teacher.createdAt));
            const { name, email, school, date } = teacher;
            const updateDate = new Date(date);
            return (
              <div className="tableItem">
                <div className="NoShowReportCol1">
                  {updateDate.toLocaleDateString('en-US')}{' '}
                  {updateDate.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
                <div className="NoShowReportCol2">{name}</div>
                <div className="NoShowReportCol3">{email}</div>
                <div className="NoShowReportCol4">{school}</div>
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
