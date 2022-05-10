/* eslint-disable consistent-return */
import axios from '../../axios';

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
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

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

export { getGeneralReport, getProductReport, getReport3, getReport5 };
