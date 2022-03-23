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

const getTransactions = async (location, page, type) => {
  if (type === 'Pending') return getPendingTransactions(location, page);
  if (type === 'Approved') return getApprovedTransactions(location, page);
  if (type === 'Denied') return getDeniedTransactions(location, page);
  return false;
};

const approveTransaction = async (location, data) => {
  try {
    console.log(data);
    const response = await fetch(
      `/api/${location}/transaction/approve/${data.uuid}`,
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
      `/api/${location}/transaction/deny/${data.uuid}`,
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

const handleTransaction = async (location, data, action) => {
  if (action === 'Approve') return approveTransaction(location, data);
  if (action === 'Deny') return denyTransaction(location, data);
  return false;
};

// eslint-disable-next-line import/prefer-default-export
export {
  getPendingTransactions,
  approveTransaction,
  denyTransaction,
  getApprovedTransactions,
  getDeniedTransactions,
  getTransactions,
  handleTransaction,
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
