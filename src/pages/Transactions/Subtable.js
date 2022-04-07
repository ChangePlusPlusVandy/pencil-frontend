/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const Subtable = ({ uuid, data, transactionType, status, onChange }) => {
  const [localData, setLocalData] = useState(data);
  const [formattedData, setFormattedData] = useState([]);

  const formatItemData = (itemData) => {
    const result = [];
    for (let i = 0; i < itemData.length; i += 2) {
      let itemName2 = '';
      let maxLimit2 = '0';
      let itemUuid2 = '';
      console.log(itemData[i]);
      if (itemData[i + 1]) {
        itemName2 = itemData[i + 1].Item.itemName;
      }
      let itemsTaken2 = '';

      if (itemData[i + 1]) {
        itemsTaken2 = String(itemData[i + 1].amountTaken);
        maxLimit2 = String(itemData[i + 1].maxLimit);
        itemUuid2 = itemData[i + 1].Item.uuid;
      }
      const newObj = {
        itemUuid1: itemData[i].Item.uuid,
        itemName1: itemData[i].Item.itemName,
        itemsTaken1: String(itemData[i].amountTaken),
        maxLimit1: String(itemData[i].maxLimit),
        itemUuid2,
        itemName2,
        itemsTaken2,
        maxLimit2,
      };
      result.push(newObj);
    }
    return result;
  };

  useEffect(() => {
    setFormattedData(formatItemData(data));
  }, []);

  useEffect(() => {
    onChange(localData, uuid);
    setFormattedData(formatItemData(localData));
  }, [localData]);

  const handleLocalChange = (e, itemUuid) => {
    const { value } = e.target;
    setLocalData((prevData) => {
      prevData.map((item) => {
        if (item.Item.uuid === itemUuid) {
          item.amountTaken = value;
        }
        return item;
      });
      return prevData;
    });
  };

  return (
    <div>
      <table className="expandedData">
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Item</th>
          <th>Quantity</th>
        </tr>
        {formattedData.map((item) => (
          <div className="expandedTableRow">
            <td>{item.itemName1}</td>
            <input
              className="editableText small"
              value={item.itemsTaken1}
              onChange={(e) => handleLocalChange(e, item.itemUuid1)}
            />
            <td>{item.itemName2}</td>
            <input
              className="editableText small"
              value={item.itemsTaken2}
              onChange={(e) => handleLocalChange(e, item.itemUuid2)}
            />
          </div>
        ))}
      </table>
    </div>
  );
};

export default Subtable;

Subtable.propTypes = {
  uuid: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  transactionType: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
