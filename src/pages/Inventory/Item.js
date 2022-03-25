import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CgTrash } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import './Item.css';
import './ActiveInventory.css';

const Item = ({
  index,
  itemName,
  limit,
  updateItem,
  handleDelete,
  editable,
}) => {
  const [active, setActive] = useState(false);
  const [localLimit, setLocalLimit] = useState(limit);

  useEffect(() => {
    updateItem(itemName, 'maxLimit', localLimit, true);
  }, [localLimit]);

  return (
    <li className={`tableItem${active ? ' setColorBlue' : ''}`}>
      <div
        className="activeInventoryCol1 vertical-align-center"
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
        role="button"
        tabIndex={0}
      >
        <GiHamburgerMenu size="24" />
      </div>
      <div className="activeInventoryCol2">{index + 1}</div>
      <div className="activeInventoryCol3">{itemName}</div>
      <div className="activeInventoryCol4">
        <input
          className="editableText2"
          type="number"
          min="0"
          value={localLimit}
          onChange={(e) => setLocalLimit(parseInt(e.target.value, 10))}
          disabled={!editable}
        />
      </div>
      <div
        className="activeInventoryCol5 vertical-align-center"
        role="button"
        tabIndex="-1"
        onClick={() => handleDelete(itemName)}
        onKeyPress={() => {}}
      >
        <CgTrash size="20" color="F04747" />
      </div>
    </li>
  );
};

Item.propTypes = {
  index: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  updateItem: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  editable: PropTypes.bool.isRequired,
};

export default Item;
