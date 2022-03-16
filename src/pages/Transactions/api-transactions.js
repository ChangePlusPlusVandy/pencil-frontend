const getPendingTransactions = async (location, page) => {
  try {
    const response = await fetch(
      `/api/${location}/transaction/pending?page=${page}`
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getApprovedTransactions = async (location) => {
  try {
    const response = await fetch(`/api/${location}/transaction/approved`);
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const getDeniedTransactions = async (location) => {
  try {
    const response = await fetch(`/api/${location}/transaction/denied`);
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

const approveTransaction = async (location, data) => {
  try {
    const response = await fetch(
      `/api/${location}/transaction/approve/${data.transactionId}`,
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

const denyTransaction = async (location, data) => {
  // TODO: fix the URI here
  try {
    const response = await fetch(
      `/api/${location}/transaction/deny/${data.transactionId}`,
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

const getTeacherByID = async (location, id) => {
  try {
    const response = await fetch(`/api/teacher/${id}`);
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: 'Teacher Not Found' };
  }
};

// eslint-disable-next-line import/prefer-default-export
export {
  getPendingTransactions,
  approveTransaction,
  denyTransaction,
  getTeacherByID,
  getApprovedTransactions,
  getDeniedTransactions,
};

// const getAllTransactions = async (location) => {
//   try {
//     const response = await fetch(
//       `/api/${location}/form/transaction/transactions`
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
