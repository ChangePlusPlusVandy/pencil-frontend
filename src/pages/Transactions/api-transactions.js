const getPendingTransactions = async (location, perpage = 10, previous = 0) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PROXY}/api/${location}/transaction/pending?perPage=${perpage}&previous=${previous}`
    );
    return await response.json();
  } catch (err) {
    return err;
  }
};

const getApprovedTransactions = async (
  location,
  perpage = 10,
  previous = 0
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PROXY}/api/${location}/transaction/approved?perPage=${perpage}&previous=${previous}`
    );
    return await response.json();
  } catch (err) {
    return err;
  }
};

const getVerifiedSchools = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PROXY}/api/school/verified`
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

const getDeniedTransactions = async (location, perpage = 10, previous = 0) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PROXY}/api/${location}/transaction/denied?perPage=${perpage}&previous=${previous}`
    );
    return await response.json();
  } catch (err) {
    return err;
  }
};

const getTransactions = async (location, type, previous = 0, perpage = 10) => {
  if (type === 'Pending')
    return getPendingTransactions(location, perpage, previous);
  if (type === 'Approved')
    return getApprovedTransactions(location, perpage, previous);
  if (type === 'Denied')
    return getDeniedTransactions(location, perpage, previous);
  return false;
};

const approveTransaction = async (location, uuid) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PROXY}/api/${location}/transaction/approve/${uuid}`,
      {
        method: 'POST',
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

const denyTransaction = async (location, uuid) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PROXY}/api/${location}/transaction/deny/${uuid}`,
      {
        method: 'POST',
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

const handleTransaction = async (location, uuid, action) => {
  if (action === 'Approve') return approveTransaction(location, uuid);
  if (action === 'Deny') return denyTransaction(location, uuid);
  return false;
};

const approveDeniedTransaction = async (location, uuid, items) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PROXY}/api/${location}/transaction/approveDenied/${uuid}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ items }),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

const approveTransactionWithNewSchool = async (location, uuid, schoolName) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PROXY}/api/${location}/transaction/approve/${uuid}?newSchool=1`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ schoolName }),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

const approveDeniedTransactionWithNewSchool = async (
  location,
  uuid,
  items,
  schoolName
) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_PROXY}/api/${location}/transaction/approveDenied/${uuid}?newSchool=1`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ schoolName, items }),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

// eslint-disable-next-line import/prefer-default-export
export {
  getPendingTransactions,
  approveTransaction,
  denyTransaction,
  approveDeniedTransaction,
  getApprovedTransactions,
  getDeniedTransactions,
  getTransactions,
  handleTransaction,
  getVerifiedSchools,
  approveDeniedTransactionWithNewSchool,
  approveTransactionWithNewSchool,
};
