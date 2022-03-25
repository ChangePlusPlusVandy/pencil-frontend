import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CgTrash } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import './Item.css';
import './ActiveInventory.css';

const Item = ({
  index,
  uuid,
  itemName,
  limit,
  updateItem,
  handleDelete,
  nameEditable,
  valueEditable,
  type,
}) => {
  const [active, setActive] = useState(false);
  const [localName, setLocalName] = useState(itemName);
  const [localLimit, setLocalLimit] = useState(limit);

  useEffect(() => {
    updateItem(uuid, 'maxLimit', localLimit, true);
  }, [localLimit]);

  useEffect(() => {
    updateItem(uuid, 'itemName', localName, false);
  }, [localName]);

  return (
    <li className={`tableItem${active ? ' setColorBlue' : ''}`}>
      <div className="activeInventoryCol1 vertical-align-center">
        {type === 'active' ? (
          <GiHamburgerMenu
            onMouseDown={() => setActive(true)}
            onMouseUp={() => setActive(false)}
            size="24"
          />
        ) : null}
      </div>
      <div className="activeInventoryCol2">{index + 1}</div>
      <div className="activeInventoryCol3">
        {type === 'active' ? (
          itemName
        ) : (
          <input
            className="editableText2"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
            disabled={!nameEditable}
          />
        )}
      </div>
      <div className="activeInventoryCol4">
        <input
          className="editableText2 text-center"
          type="number"
          min="0"
          value={localLimit}
          onChange={(e) => setLocalLimit(parseInt(e.target.value, 10))}
          disabled={!valueEditable}
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
  uuid: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  updateItem: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  nameEditable: PropTypes.bool.isRequired,
  valueEditable: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
};

export default Item;
