/* eslint-disable react/prop-types */
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import './Item.css';
import EditableText from './EditableText';

const Item = ({
  number,
  name,
  limit,
  inventory,
  updateInventory,
  handleDelete,
}) => {
  const a = 0;
  return (
    <li className="newItem">
      <div className="dragIcon">
        <GiHamburgerMenu />
      </div>
      <div className="itemOrder">{number + 1}</div>
      <EditableText
        className="itemName"
        role="button"
        tabIndex="-1"
        widthSize="20"
        initValue={name}
        inventory={inventory}
        updateInventory={updateInventory}
        keyToUpdate="itemName"
        isNumber={false}
      />
      <EditableText
        className="maxLimit"
        role="button"
        tabIndex="-1"
        widthSize="5"
        initValue={limit.toString()}
        inventory={inventory}
        updateInventory={updateInventory}
        keyToUpdate="maxLimit"
        isNumber
      />
      <div
        className="itemDelete"
        role="button"
        tabIndex="-1"
        onClick={() => handleDelete(name)}
        onKeyPress={() => {}}
      >
        <GrClose />
      </div>
    </li>
  );
};

export default Item;
