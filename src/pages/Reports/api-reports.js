/* eslint-disable consistent-return */
import axios from '../../axios';

const getSchools = async () => {
  try {
    const schools = await axios.get(`/school/verified`);
    return schools.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// TODO: RENAME ALL USAGES TO getWeeklyReport
const getGeneralReport = async (startDate, endDate, schoolName, location) => {
  try {
    const from = startDate && new Date(startDate).toISOString();
    const to = endDate && new Date(endDate);
    if (endDate) to.setDate(to.getDate() + 1);
    const query = `startDate=${from}&endDate=${to}&school=${schoolName}`;
    const reqUrl =
      (from && to) || schoolName
        ? `/${location}/reports/report1?${query}`
        : `/${location}/reports/report1`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getTeacherReport = async (startDate, endDate, schoolName, location) => {
  try {
    const from = startDate && new Date(startDate).toISOString();
    const to = endDate && new Date(endDate);
    if (endDate) to.setDate(to.getDate() + 1);
    const query = `startDate=${from}&endDate=${to}&school=${schoolName}`;
    const reqUrl =
      (from && to) || schoolName
        ? `/${location}/reports/report5?${query}`
        : `/${location}/reports/report5`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getSchoolsReport = async (startDate, endDate, schoolName, location) => {
  try {
    const from = startDate && new Date(startDate).toISOString();
    const to = endDate && new Date(endDate);
    if (endDate) to.setDate(to.getDate() + 1);
    const query = `startDate=${from}&endDate=${to}&school=${schoolName}`;
    const reqUrl =
      (from && to) || schoolName
        ? `/${location}/reports/report2?${query}`
        : `/${location}/reports/report2`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const printWeeklyReport = async (
  startDate,
  endDate,
  schoolName,
  location,
  reportName
) => {
  try {
    const reportEndpoints = {
      General: 'printReport1',
      Schools: 'printReport2',
      'No Show': 'printReport3',
      Product: 'printReport4',
      Teachers: 'printReport5',
    };

    // Format query parameters
    const from = startDate && new Date(startDate).toISOString();
    let to = endDate && new Date(endDate);
    if (endDate) {
      to = new Date(to.setDate(to.getDate() + 1)).toISOString();
    }

    // Send query
    const query = `startDate=${from}&endDate=${to}&school=${schoolName}`;
    const reqUrl =
      (from && to) || schoolName
        ? `/${location}/reports/${reportEndpoints[reportName]}?${query}`
        : `/${location}/reports/${reportEndpoints[reportName]}`;

    await axios
      .get(reqUrl, {
        responseType: 'blob',
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
      });
  } catch (err) {
    console.log(err);
  }
};

const getProductReport = async (startDate, endDate, schoolName, location) => {
  try {
    const from = startDate && new Date(startDate).toISOString();
    let to = endDate && new Date(endDate);
    if (endDate) {
      to.setDate(to.getDate() + 1);
      to = to.toISOString();
    }
    const query = `startDate=${from}&endDate=${to}&school=${schoolName}`;
    const response = await axios.get(`/${location}/reports/report4?${query}`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getNoShowReport = async (startDate, endDate, schoolName, location) => {
  try {
    const from = startDate && new Date(startDate).toISOString();
    let to = endDate && new Date(endDate);
    if (endDate) {
      to.setDate(to.getDate() + 1);
      to = to.toISOString();
    }
    const query = `startDate=${from}&endDate=${to}&school=${schoolName}`;
    const response = await axios.get(`/${location}/reports/report3?${query}`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export {
  getSchools,
  getGeneralReport,
  getSchoolsReport,
  getProductReport,
  getTeacherReport,
  getNoShowReport,
  printWeeklyReport,
};
