/* eslint-disable consistent-return */
import axios from '../../axios';

// Returns the inventory for a location
// @param location: string
// @returns: response from server
const getInventory = async (location, refresh) => {
  try {
    console.log(refresh);
    const response = await axios.get(
      `/${location}/form/getShopForm${refresh ? `?refresh=${refresh}` : ''}`
    );
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Changes the shop inventory for a location
// @param data: array - new inventory data
// @param location: string
// @returns: response from server
const postInventory = async (data, location) => {
  try {
    for (let i = 0; i < data.length; i += 1) {
      // eslint-disable-next-line no-param-reassign
      data[i].itemOrder = i;
    }
    const response = await axios.put(`/${location}/form/updateSupply`, data);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Returns the master inventory for all locations
// @returns: response from server
const getMasterInv = async (refresh) => {
  try {
    const response = await axios.get(
      `/masterInventory/getAllItems${refresh ? `?refresh=${refresh}` : ''}`
    );

    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

// Changes the master inventory
// @param data: array - new inventory data
// @returns: response from server
const postMasterInv = async (data) => {
  try {
    const response = await axios.put(
      `/masterInventory/updateMasterInventory`,
      data
    );
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
};

export { getInventory, postInventory, getMasterInv, postMasterInv };
