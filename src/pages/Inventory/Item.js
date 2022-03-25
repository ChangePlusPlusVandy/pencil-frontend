import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CgTrash } from 'react-icons/cg';
import { GiHamburgerMenu } from 'react-icons/gi';
import './Item.css';
import EditableText from './EditableText';
import './ActiveInventory.css';

const Item = ({
  number,
  itemName,
  limit,
  inventory,
  updateInventory,
  handleDelete,
}) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    document.addEventListener('dragend', () => {
      setActive(false);
    });
    return () => {
      document.removeEventListener('dragend', () => {
        setActive(false);
      });
    };
  }, []);

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
      <div className="activeInventoryCol2">{number + 1}</div>
      <EditableText
        role="button"
        tabIndex="-1"
        widthSize="20"
        itemName={itemName}
        initValue={itemName}
        inventory={inventory}
        updateInventory={updateInventory}
        keyToUpdate="Item.itemName"
        cssClass="activeInventoryCol3"
        isNumber={false}
        setActive={setActive}
      />
      <EditableText
        role="button"
        tabIndex="-1"
        widthSize="5"
        itemName={itemName}
        initValue={limit.toString()}
        inventory={inventory}
        updateInventory={updateInventory}
        keyToUpdate="maxLimit"
        cssClass="activeInventoryCol4"
        setActive={setActive}
        isNumber
      />
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
  number: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  limit: PropTypes.string.isRequired,
  inventory: PropTypes.shape.isRequired,
  updateInventory: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Item;
