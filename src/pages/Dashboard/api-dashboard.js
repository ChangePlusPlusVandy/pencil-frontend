const getDailyStats = async (location) => {
  try {
    const response = await fetch(`api/${location}/dashboard/dailystats`);
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getYearlyStats = async (location) => {
  try {
    const response = await fetch(`api/${location}/dashboard/yearlystats`);
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { getDailyStats, getYearlyStats };
