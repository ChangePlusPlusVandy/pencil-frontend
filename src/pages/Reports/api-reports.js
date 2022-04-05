/* eslint-disable consistent-return */
const formatDateTime = (date) => {
  // format startDate from month/day/year to year-month-day
  // and add 00:00:00 to the end of the date
  if (!date || date === '') return '';
  const dateArray = date.split('/');
  const dateFormatted = `${dateArray[2]}-${dateArray[0]}-${dateArray[1]}`;
  const time = '00:00:00';
  return `${dateFormatted}T${time}.000`;
};

const getGeneralReport = async (startDate, endDate, schoolId, location) => {
  try {
    console.log(startDate, endDate, schoolId);
    const from = formatDateTime(startDate);
    const to = formatDateTime(endDate);
    const query = `startDate=${from}&endDate=${to}&school=${schoolId}`;
    const response = await fetch(`/api/${location}/reports/report1?${query}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getProductReport = async (startDate, endDate, schoolId, location) => {
  try {
    const from = formatDateTime(startDate);
    const to = formatDateTime(endDate);
    const query = `startDate=${from}&endDate=${to}&school=${schoolId}`;
    const response = await fetch(`/api/${location}/reports/report4?${query}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getReport5 = async (startDate, endDate, schoolId, location) => {
  try {
    const from = formatDateTime(startDate);
    const to = formatDateTime(endDate);
    const query = `startDate=${from}&endDate=${to}&school=${schoolId}`;
    const response = await fetch(`/api/${location}/reports/report5?${query}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { getGeneralReport, getProductReport, getReport5 };
