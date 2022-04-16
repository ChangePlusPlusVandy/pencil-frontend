/**
 * Retrieves all transactions from Transaction database from Backend
 *
 * @returns {Object} - All transaction objects with information about transaction
 */
const getSchedules = (location, mode, page) => {
  const response = fetch(
    `api/schedule/${location}/getSchedule?mode=${mode}&page=${page}`
  )
    .then((data) => data.json())
    .catch((err) => ({
      err: `Error retrieving schedule ${err}`,
    }));
  console.log(response);
  return response;
};

// eslint-disable-next-line import/prefer-default-export
export { getSchedules };
