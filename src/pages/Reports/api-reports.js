/* eslint-disable consistent-return */
import axios from '../../axios';

// TODO: RENAME ALL USAGES TO getWeeklyReport
const getGeneralReport = async (startDate, endDate, schoolId, location) => {
  try {
    console.log('Generating General Report:', startDate, endDate, schoolId);
    const from = startDate && new Date(startDate).toISOString();
    const to = endDate && new Date(endDate);
    if (endDate) to.setDate(to.getDate() + 1);
    const query = `startDate=${from}&endDate=${to}&school=${schoolId}`;
    const reqUrl =
      from && to && schoolId
        ? `/${location}/reports/report1?${query}`
        : `/${location}/reports/report1`;
    const response = await axios.get(reqUrl);
    console.log(response.data);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const printWeeklyReport = async (
  startDate,
  endDate,
  schoolId,
  location,
  reportName
) => {
  try {
    console.log('Printing Weekly Report:', startDate, endDate, schoolId);

    const reportEndpoints = {
      General: 'printReport1',
      'No Show': 'printReport3',
      Product: 'printReport4',
    };

    // Format query parameters
    const from = startDate && new Date(startDate).toISOString();
    const to = endDate && new Date(endDate);
    if (endDate) to.setDate(to.getDate() + 1);

    // Send query
    const query = `startDate=${from}&endDate=${to}&school=${schoolId}`;

    const response = await fetch(
      `/api/${location}/reports/${reportEndpoints[reportName]}?${query}`
    );
  } catch (err) {
    console.log(err);
  }
};

// const printWeeklyReport = async (
//   startDate,
//   endDate,
//   schoolId,
//   location,
//   reportName
// ) => {
//   try {
//     console.log('Printing Weekly Report:', startDate, endDate, schoolId);

//     // Format query parameters
//     const from = startDate && new Date(startDate).toISOString();
//     const to = endDate && new Date(endDate);
//     if (endDate) to.setDate(to.getDate() + 1);

//     // Send query
//     const query = `startDate=${from}&endDate=${to}&school=${schoolId}`;
//     const response = await fetch(
//       `/api/${location}/reports/printReport1?${query}`
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };

const getProductReport = async (startDate, endDate, schoolId, location) => {
  try {
    const from = startDate && new Date(startDate).toISOString();
    let to = endDate && new Date(endDate);
    if (endDate) {
      to.setDate(to.getDate() + 1);
      to = to.toISOString();
    }
    const query = `startDate=${from}&endDate=${to}&school=${schoolId}`;
    const response = await axios.get(`/${location}/reports/report4?${query}`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getReport3 = async (startDate, endDate, schoolId, location) => {
  try {
    const from = startDate && new Date(startDate).toISOString();
    let to = endDate && new Date(endDate);
    if (endDate) {
      to.setDate(to.getDate() + 1);
      to = to.toISOString();
    }
    const query = `startDate=${from}&endDate=${to}&school=${schoolId}`;
    const response = await axios.get(`/${location}/reports/report3?${query}`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getReport5 = async (startDate, endDate, schoolId, location) => {
  try {
    const from = startDate && new Date(startDate).toISOString();
    let to = endDate && new Date(endDate);
    if (endDate) {
      to.setDate(to.getDate() + 1);
      to = to.toISOString();
    }
    const query = `startDate=${from}&endDate=${to}&school=${schoolId}`;
    const response = await axios.get(`/${location}/reports/report5?${query}`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export {
  getGeneralReport,
  getProductReport,
  getReport3,
  getReport5,
  printWeeklyReport,
};
