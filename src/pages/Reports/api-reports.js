/* eslint-disable consistent-return */

const getGeneralReport = async (startDate, endDate, schoolId, location) => {
  try {
    console.log('Generating General Report:', startDate, endDate, schoolId);
    const from = startDate && new Date(startDate).toISOString();
    const to = endDate && new Date(endDate);
    if (endDate) to.setDate(to.getDate() + 1);
    const query = `startDate=${from}&endDate=${to}&school=${schoolId}`;
    const response = await fetch(`/api/${location}/reports/report1?${query}`);
    return await response.json();
  } catch (err) {
    console.log(err);
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
    const response = await fetch(`/api/${location}/reports/report4?${query}`);
    return await response.json();
  } catch (err) {
    console.log(err);
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
    const response = await fetch(`/api/${location}/reports/report5?${query}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { getGeneralReport, getProductReport, getReport5 };
