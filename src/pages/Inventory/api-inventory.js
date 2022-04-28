/* eslint-disable consistent-return */
import axios from '../../axios';

const getInventory = async (location) => {
  const response = await axios.get(`/${location}/form/getShopForm`);
  return response.data;
};

const postInventory = async (data, location) => {
  try {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; i++) {
      // eslint-disable-next-line no-param-reassign
      data[i].itemOrder = i;
    }
    const response = await axios.put(`/${location}/form/updateSupply`, data);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const getMasterInv = async () => {
  try {
    const response = await axios.get(`/masterInventory/getAllItems`);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const postMasterInv = async (data) => {
  try {
    const response = await axios.put(
      `/masterInventory/updateMasterInventory`,
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export { getInventory, postInventory, getMasterInv, postMasterInv };
