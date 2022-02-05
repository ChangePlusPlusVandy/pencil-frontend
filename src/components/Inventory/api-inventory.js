/* eslint-disable consistent-return */
const getInventory = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/form/getShopForm');
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const postInventory = async (data) => {
  try {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; i++) {
      // eslint-disable-next-line no-param-reassign
      data[i].itemOrder = i;
    }
    const response = await fetch(
      'http://localhost:8080/api/form/updateSupply',
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

export { getInventory, postInventory };
