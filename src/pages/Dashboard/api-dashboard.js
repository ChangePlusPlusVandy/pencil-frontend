import axios from '../../axios';

const getDailyStats = async (location) => {
  try {
    const todayStart = new Date().setHours(0, 0, 0);
    const todayEnd = new Date().setHours(23, 59, 59);
    const response = await axios.get(`/${location}/dashboard/dailystats`, {
      startDate: todayStart,
      endDate: todayEnd,
    });

    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getMonthlyStats = async (location) => {
  try {
    const monthStart = new Date().setDate(1);
    const monthEnd = new Date();
    const response = await axios.get(`/${location}/dashboard/monthlystats`, {
      startDate: monthStart,
      endDate: monthEnd,
    });

    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

const getYearlyStats = async (location) => {
  try {
    const yearStart = new Date().setMonth(0, 1);
    const yearEnd = new Date().setMonth(11, 31);
    const response = await axios.get(`/${location}/dashboard/yearlystats`, {
      startDate: yearStart,
      endDate: yearEnd,
    });

    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export { getDailyStats, getMonthlyStats, getYearlyStats };
