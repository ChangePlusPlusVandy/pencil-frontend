/* eslint-disable react/forbid-prop-types */
import React from 'react';
import ReactDragListView from 'react-drag-listview/lib/index';
import PropTypes from 'prop-types';
import Item from './Item';

const ActiveInventory = ({ data, setData, setChanged }) => {
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
