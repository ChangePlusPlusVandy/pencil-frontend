const getDailyStats = async (location) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PROXY}/api/${location}/dashboard/dailystats`
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getYearlyStats = async (location) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PROXY}/api/${location}/dashboard/yearlystats`
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

export { getDailyStats, getYearlyStats };
