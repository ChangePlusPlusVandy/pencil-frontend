/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../AuthContext';
import { getSchoolsReport } from './api-reports';
import './SchoolsReport.css';

const SchoolsReport = ({
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
      await getSchoolsReport(
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
        <div className="schoolsReportCol1">School</div>
        <div className="schoolsReportCol2">No. Shoppers</div>
        <div className="schoolsReportCol3">No Show Rate</div>
      </div>
      <div>
        {reportData?.reportBody?.map((product) => (
          <div className="tableItem">
            <div className="schoolsReportCol1">{product.school}</div>
            <div className="schoolsReportCol2">{product.numShoppers}</div>
            <div className="schoolsReportCol3">
              {product.noShowRate.toFixed(3)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchoolsReport;

SchoolsReport.propTypes = {
  fromDate: PropTypes.string,
  untilDate: PropTypes.string,
  schoolFilter: PropTypes.string,
  setError: PropTypes.func.isRequired,
  setErrorDescription: PropTypes.func.isRequired,
};

SchoolsReport.defaultProps = {
  fromDate: '',
  untilDate: '',
  schoolFilter: '',
};
