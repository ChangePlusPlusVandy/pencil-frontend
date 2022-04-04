/**
 * Retrieves all transactions from Transaction database from Backend
 *
 * @returns {Object} - All transaction objects with information about transaction
 */
const getSchedules = (location) => {
  const response = fetch(`api/schedule/${location}/getSchedule`)
    .then((data) => data.json())
    .catch((err) => ({
      err: `Error retrieving schedule ${err}`,
    }));
  return response;
};

// eslint-disable-next-line import/prefer-default-export
export { getSchedules };
