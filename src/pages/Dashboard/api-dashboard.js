import axios from '../../axios';

const getDailyStats = async (location) => {
  try {
    const response = await axios.get(`/${location}/dashboard/dailystats`);
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getYearlyStats = async (location) => {
  try {
    const response = await axios.get(`/${location}/dashboard/yearlystats`);
    return response.data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { getDailyStats, getYearlyStats };
