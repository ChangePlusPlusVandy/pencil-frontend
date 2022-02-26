/* eslint-disable consistent-return */

const getInventory = async (location) => {
  try {
    const response = await fetch(`/api/${location}/form/getShopForm`);
    return await response.json();
  } catch (err) {
    return err;
  }
};

const postInventory = async (data, location) => {
  try {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; i++) {
      // eslint-disable-next-line no-param-reassign
      data[i].itemOrder = i;
    }
    const response = await fetch(`/api/${location}/form/updateSupply`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const getMasterInv = async (location) => {
  try {
    // FIXME: WILL HAVE TO ADAPT THIS TO LOCATIONS
    const response = await fetch(
      `/api/${location}/masterInventory/getAllItems`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }
    );

    console.log('THIS IS THE DATA: ', response);

    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const postMasterInv = async (data, location) => {
  try {
    const response = await fetch(
      `/api/${location}/masterInventory/updateMasterInventory`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify(data),
      }
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export { getInventory, postInventory, getMasterInv, postMasterInv };