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
    console.log(data);
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
