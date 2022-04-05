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

const getReport1 = async (startDate, endDate, schoolId) => {
  try {
    console.log(startDate, endDate, schoolId);
    const from = formatDateTime(startDate);
    const to = formatDateTime(endDate);
    const query = `startDate=${from}&endDate=${to}&school=${schoolId}`;
    const response = await fetch(`/api/reports/report1?${query}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getReport5 = async (startDate, endDate, schoolId) => {
  try {
    const from = formatDateTime(startDate);
    const to = formatDateTime(endDate);
    const query = `startDate=${from}&endDate=${to}&school=${schoolId}`;
    const response = await fetch(`/api/reports/report5?${query}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { getReport1, getReport5 };
