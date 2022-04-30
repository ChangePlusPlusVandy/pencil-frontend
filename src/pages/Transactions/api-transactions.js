import axios from '../../axios';

// Returns all pending transactions
// @param location: string
// @param perpage: number - number of locations to be added
// @param previous: number - number of locations currently loaded
// @returns: array of transactions
const getPendingTransactions = async (location, perpage = 10, previous = 0) => {
  try {
    const response = await axios.get(
      `/${location}/transaction/pending?perPage=${perpage}&previous=${previous}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

// Returns all approved transactions
// @param location: string
// @param perpage: number - number of locations to be added
// @param previous: number - number of locations currently loaded
// @returns: array of transactions
const getApprovedTransactions = async (
  location,
  perpage = 10,
  previous = 0
) => {
  try {
    const response = await axios.get(
      `/${location}/transaction/approved?perPage=${perpage}&previous=${previous}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

// Returns all verified schools
// @returns: array of schools
const getVerifiedSchools = async () => {
  try {
    const response = await axios.get(`/school/verified`);

    return response.data;
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

// Returns all denied transactions
// @param location: string
// @param perpage: number - number of locations to be added
// @param previous: number - number of locations currently loaded
// @returns: array of transactions
const getDeniedTransactions = async (location, perpage = 10, previous = 0) => {
  try {
    const response = await axios.get(
      `/${location}/transaction/denied?perPage=${perpage}&previous=${previous}`
    );
    return response.data;
  } catch (err) {
    return err;
  }
};

//  Returns transactions of a specific type
//  @param location: string
//  @param type: string - type of transactions to be returned
//  @param perpage: number - number of locations to be added
//  @param previous: number - number of locations currently loaded
//  @returns: array of transactions of type type
const getTransactions = async (location, type, previous = 0, perpage = 10) => {
  if (type === 'Pending')
    return getPendingTransactions(location, perpage, previous);
  if (type === 'Approved')
    return getApprovedTransactions(location, perpage, previous);
  if (type === 'Denied')
    return getDeniedTransactions(location, perpage, previous);
  return false;
};

// Approves a transaction
// @param location: string
// @param uuid: string - uuid of transaction to be approved
// @returns: response from server
const approveTransaction = async (location, uuid) => {
  try {
    const response = await axios.post(
      `/${location}/transaction/approve/${uuid}`
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

// Denies a transaction
// @param location: string
// @param uuid: string - uuid of transaction to be denied
// @returns: response from server
const denyTransaction = async (location, uuid) => {
  try {
    const response = await axios.post(`/${location}/transaction/deny/${uuid}`);
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

// Approves or denies a transaction based on action
// @param location: string
// @param uuid: string - uuid of transaction to be approved
// @param action: string - action to be taken
// @returns: response from server or false if action is not valid
const handleTransaction = async (location, uuid, action) => {
  if (action === 'Approve') return approveTransaction(location, uuid);
  if (action === 'Deny') return denyTransaction(location, uuid);
  return false;
};

// Approves a transaction that was denied
// @param location: string
// @param uuid: string - uuid of transaction to be approved
// @param items: array - items to be approved
// @returns: response from server
const approveDeniedTransaction = async (location, uuid, items) => {
  try {
    const response = await axios.post(
      `/${location}/transaction/approveDenied/${uuid}`,
      { items }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

// Approves a transaction for a teacher from a new school
// @param location: string
// @param uuid: string - uuid of transaction to be approved
// @param schoolName: string - name of school to be added
// @returns: response from server
const approveTransactionWithNewSchool = async (location, uuid, schoolName) => {
  try {
    const response = await axios.post(
      `/${location}/transaction/approve/${uuid}?newSchool=1`,
      { schoolName }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return { error: `Transaction not processed: ${err.error}` };
  }
};

// Approves a transaction for a teacher from a new school
// @param location: string
// @param uuid: string - uuid of transaction to be approved
// @param items: array - items to be approved
// @param schoolName: string - name of school to be added
// @returns: response from server
const approveDeniedTransactionWithNewSchool = async (
  location,
  uuid,
  items,
  schoolName
) => {
  try {
    const response = await axios.post(
      `/${location}/transaction/approveDenied/${uuid}?newSchool=1`,
      { schoolName, items }
    );
    return response.data;
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
