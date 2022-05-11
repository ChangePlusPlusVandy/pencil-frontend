import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CgTrash } from 'react-icons/cg';
import { BiArchiveIn } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import './Inventory.css';

const Item = ({
  index,
  uuid,
  itemName,
  itemValue,
  updateItem,
  handleDelete,
  nameEditable,
  valueEditable,
  type,
}) => {
  const [active, setActive] = useState(false);
  const [localName, setLocalName] = useState(itemName);
  const [localValue, setLocalValue] = useState(itemValue);
  const valueKey = type === 'active' ? 'maxLimit' : 'itemPrice';

  // Updates local data if name is changed
  // @param e: object - event
  // @returns: void
  const handleNameChange = (e) => {
    setLocalName(e.target.value);
    updateItem(uuid, 'itemName', e.target.value, false);
  };

  // Updates local data if value is changed
  // @param e: object - event
  // @returns: void
  const handleValueChange = (e) => {
    const value = parseFloat(e.target.value);
    setLocalValue(value);
    updateItem(uuid, valueKey, value, true);
  };

  return (
    <li className={`tableItem${active ? ' setColorBlue' : ''}`}>
      <div className="inventoryCol1 vertical-align-center">
        {type === 'active' ? (
          <GiHamburgerMenu
            onMouseDown={() => setActive(true)}
            onMouseUp={() => setActive(false)}
            size="24"
          />
        ) : null}
      </div>
      <div className="inventoryCol2">{index + 1}</div>
      <div className="inventoryCol3">
        {type === 'active' ? (
          itemName
        ) : (
          <input
            className="editableText medium"
            value={localName}
            onChange={handleNameChange}
            disabled={!nameEditable}
          />
        )}
      </div>
      <div className="inventoryCol4">
        <input
          className="editableText text-center small"
          type="number"
          min="0"
          step={`${type === 'active' ? '1' : '0.01'}`}
          value={localValue}
          onChange={handleValueChange}
          disabled={!valueEditable}
        />
      </div>
      <div
        className="inventoryCol5 vertical-align-center"
        role="button"
        tabIndex="-1"
        onClick={() => handleDelete(uuid)}
        onKeyPress={() => {}}
      >
        {type === 'active' ? (
          <CgTrash size="20" color="F04747" />
        ) : (
          <BiArchiveIn size="20" color="F04747" />
        )}
      </div>
    </li>
  );
};

Item.propTypes = {
  index: PropTypes.number.isRequired,
  uuid: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  itemValue: PropTypes.number.isRequired,
  updateItem: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  nameEditable: PropTypes.bool,
  valueEditable: PropTypes.bool,
  type: PropTypes.string.isRequired,
};

Item.defaultProps = {
  nameEditable: false,
  valueEditable: false,
};

export default Item;
