/* eslint-disable consistent-return */
const getReport1 = async (startDate, endDate) => {
  try {
    const endpoint = 'http://localhost:8080/api/reports/report1';
    const query = `startDate=${startDate}%2000:00:00&endDate=${endDate}%2000:00:00`;

    const response = await fetch(`${endpoint}?${query}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getReport2 = async (startDate, endDate) => {
  try {
    const endpoint = 'http://localhost:8080/api/reports/report2';
    const query = `startDate=${startDate}%2000:00:00&endDate=${endDate}%2000:00:00`;

    const response = await fetch(`${endpoint}?${query}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getReport5 = async (startDate, endDate) => {
  try {
    const endpoint = 'http://localhost:8080/api/reports/report5';
    const query = `startDate=${startDate}%2000:00:00&endDate=${endDate}%2000:00:00`;

    const response = await fetch(`${endpoint}?${query}`);
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
