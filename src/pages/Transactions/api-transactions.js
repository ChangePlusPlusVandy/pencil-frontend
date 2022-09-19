import axios from '../../axios';

const DEF_PER_PAGE = 10;
const DEF_PREVIOUS = 0;

// Returns all pending transactions
// @param location: string
// @param perpage: number - number of locations to be added
// @param previous: number - number of locations currently loaded
// @returns: array of transactions
const getPendingTransactions = async (
  location,
  perPage = DEF_PER_PAGE,
  previous = DEF_PREVIOUS
) => {
  try {
    const reqUrl =
      perPage === DEF_PER_PAGE && previous === DEF_PREVIOUS
        ? `/${location}/transaction/pending`
        : `/${location}/transaction/pending?perPage=${perPage}&previous=${previous}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Returns all approved transactions
// @param location: string
// @param perpage: number - number of locations to be added
// @param previous: number - number of locations currently loaded
// @returns: array of transactions
const getApprovedTransactions = async (
  location,
  perPage = DEF_PER_PAGE,
  previous = DEF_PREVIOUS
) => {
  try {
    const response = await axios.get(
      `/${location}/transaction/approved?perPage=${perPage}&previous=${previous}`
    );
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Returns all verified schools
// @returns: array of schools
const getVerifiedSchools = async () => {
  try {
    const response = await axios.get(`/school/verified`);

    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Returns all denied transactions
// @param location: string
// @param perpage: number - number of locations to be added
// @param previous: number - number of locations currently loaded
// @returns: array of transactions
const getDeniedTransactions = async (
  location,
  perPage = DEF_PER_PAGE,
  previous = DEF_PREVIOUS
) => {
  try {
    const response = await axios.get(
      `/${location}/transaction/denied?perPage=${perPage}&previous=${previous}`
    );
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

//  Returns transactions of a specific type
//  @param location: string
//  @param type: string - type of transactions to be returned
//  @param perpage: number - number of locations to be added
//  @param previous: number - number of locations currently loaded
//  @returns: array of transactions of type type
const getTransactions = async (
  location,
  type,
  previous = DEF_PREVIOUS,
  perPage = DEF_PER_PAGE
) => {
  if (type === 'Pending')
    return getPendingTransactions(location, perPage, previous);
  if (type === 'Approved')
    return getApprovedTransactions(location, perPage, previous);
  if (type === 'Denied')
    return getDeniedTransactions(location, perPage, previous);
  return false;
};

const clearDeniedTransactions = async (location) => {
  try {
    const response = await axios.post(
      `/${location}/transaction/clear-denied-transactions`
    );
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
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
    return Promise.reject(err);
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
    return Promise.reject(err);
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
    return Promise.reject(err);
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
    return Promise.reject(err);
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
    return Promise.reject(err);
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
  clearDeniedTransactions,
};
