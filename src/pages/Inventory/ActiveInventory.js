/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import ReactDragListView from 'react-drag-listview/lib/index';
import PropTypes from 'prop-types';
import Item from './Item';
import { getInventory } from './api-inventory';
import { useAuth } from '../../AuthContext';

const ActiveInventory = ({ data, setData, setChanged }) => {
  const { currentLocation } = useAuth();

  useEffect(() => {
    getInventory(currentLocation).then((result) => {
      if (result instanceof Error) {
        // eslint-disable-next-line no-alert
        alert(
          'Something went wrong in the backend server. Please contact the developer team'
        );
        console.log(result);
      } else {
        setData(result);
      }
    });
  }, []);

  const updateData = (newData) => {
    setChanged(true);
    setData([]);
    setData(newData);
  };

  const handleItemChange = (item) => {
    setChanged(true);
    setData(item);
  };

  const handleDelete = (name) => {
    const newData = data.filter((item) => item['Item.itemName'] !== name);
    setData([]);
    setData(newData);
    setChanged(true);
  };

  // Properties to pass to ReactDragListView package
  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      const newData = data; // reorders the item

      const item = newData.splice(fromIndex, 1)[0];
      newData.splice(toIndex, 0, item);
      updateData(newData);
    },

    nodeSelector: 'li',
    handleSelector: 'div',
    lineClassName: 'dragLine',
  };

  return (
    <div>
      <div className="dragList">
        <div className="containerHeader">
          <div className="headerName">Item Name</div>
          <div className="headerItemLimit">Item Limit</div>
        </div>
      </div>
      <ReactDragListView {...dragProps}>
        <ul className="dragList">
          {data.map((item, index) => (
            <Item
              key={item['Item.itemName']}
              number={index}
              itemName={item['Item.itemName']}
              limit={item.maxLimit}
              inventory={data}
              updateInventory={handleItemChange}
              handleDelete={handleDelete}
            />
          ))}
        </ul>
      </ReactDragListView>
    </div>
  );
};

export default ActiveInventory;

ActiveInventory.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  setData: PropTypes.func.isRequired,
  setChanged: PropTypes.func.isRequired,
};
