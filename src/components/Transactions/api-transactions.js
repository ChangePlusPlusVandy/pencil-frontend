/**
 * Retrieves all transactions from Transaction database from Backend
 *
 * @returns {Object} - All transaction objects with information about transaction
 */
// const getAllTransactions = async () => {
//   try {
//     const response = await fetch(
//       'http://localhost:8080/api/form/transaction/transactions'
//     );

//     if (!response.json().body.error) {
//       return await response.json();
//     }
//     console.log('Error retrieving transactions');
//     return { error: 'Error retrieving transactions' };
//   } catch (err) {
//     console.log(err);
//     return { error: 'Teacher not found' };
//   }
// };

const getAllTransactions = async (location) => {
  try {
    const response = await fetch(`/api/${location}/transaction/transactions`);
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const approveTransaction = async (data) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/form/transaction/approve/${data.transactionId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'Teacher not found' };
  }
};

const denyTransaction = async (data) => {
  // TODO: fix the URI here
  try {
    const response = await fetch(
      `http://localhost:8080/api/form/transaction/deny/${data.transactionId}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'Teacher not found' };
  }
};

const getTeacherByID = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:8080/api/form/teacher/${id}`
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'Teacher Not Found' };
  }
};

// eslint-disable-next-line import/prefer-default-export
export {
  getAllTransactions,
  approveTransaction,
  denyTransaction,
  getTeacherByID,
};
