import axios from '../../axios';

const getDailyStats = async (location) => {
  try {
    const todayStart = new Date().setHours(0, 0, 0);
    const todayEnd = new Date().setHours(23, 59, 59);
    const response = await fetch(`api/${location}/dashboard/dailystats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: todayStart,
        endDate: todayEnd,
      }),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getMonthlyStats = async (location) => {
  try {
    const monthStart = new Date().setDate(1);
    const monthEnd = new Date();
    const response = await fetch(`api/${location}/dashboard/monthlystats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: monthStart,
        endDate: monthEnd,
      }),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getYearlyStats = async (location) => {
  try {
    const yearStart = new Date().setMonth(0, 1);
    const yearEnd = new Date().setMonth(11, 31);
    const response = await fetch(`api/${location}/dashboard/yearlystats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        startDate: yearStart,
        endDate: yearEnd,
      }),
    });

    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { getDailyStats, getMonthlyStats, getYearlyStats };
