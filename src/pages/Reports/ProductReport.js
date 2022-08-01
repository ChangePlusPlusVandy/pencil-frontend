/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../AuthContext';
import { getProductReport } from './api-reports';
import './ProductReport.css';

const ProductReport = ({
  fromDate,
  untilDate,
  schoolFilter,
  setError,
  setErrorDescription,
}) => {
  const { currentLocation } = useAuth();
  const [reportData, setReportData] = useState([]);

  // useEffect(() => {
  //   let schoolUuid = '';
  //   if (schoolFilter && reportData) {
  //     reportData.forEach((item) => {
  //       if (item.School.name === schoolFilter) schoolUuid = item.School.uuid;
  //     });
  //   }
  //   getProductReport(fromDate, untilDate, schoolUuid, currentLocation).then(
  //     (data) => {
  //       if (data && !data.error) {
  //         setReportData(data.transactions);
  //         // generate list of unique school names
  //         const schoolList = data.transactions.map((item) => item.School.name);
  //         setSchoolNameList([...new Set(schoolList)]);
  //       }
  //     }
  //   );
  // }, [fromDate, untilDate, schoolFilter]);

  useEffect(async () => {
    try {
      await getProductReport(
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
        <div className="productReportCol1">Item Name</div>
        <div className="productReportCol2">No. Taken</div>
        <div className="productReportCol3">No. Shoppers</div>
        <div className="productReportCol4">Shop Rate</div>
        <div className="productReportCol5">Max Rate</div>
        <div className="productReportCol6">Total Value</div>
      </div>
      <div>
        {reportData?.reportBody?.map((product) => (
          <div className="tableItem">
            <div className="productReportCol1">{product.itemName}</div>
            <div className="productReportCol2">{product.numTaken}</div>
            <div className="productReportCol3">{product.numShoppers}</div>
            <div className="productReportCol4">
              {product.percentageOfShoppers}
            </div>
            <div className="productReportCol5">
              {product.percentageTakenAtMax}
            </div>
            <div className="productReportCol6">
              $ {(Math.round(product.totalValueTaken * 100) / 100).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReport;

ProductReport.propTypes = {
  fromDate: PropTypes.string,
  untilDate: PropTypes.string,
  schoolFilter: PropTypes.string,
  setError: PropTypes.func.isRequired,
  setErrorDescription: PropTypes.func.isRequired,
};

ProductReport.defaultProps = {
  fromDate: '',
  untilDate: '',
  schoolFilter: '',
};
