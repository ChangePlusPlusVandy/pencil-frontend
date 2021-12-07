/* eslint-disable react/prop-types */
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import './Item.css';
import EditableText from './EditableText';

const Item = ({ number, name, limit, inventory, updateInventory }) => {
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
        initValue={name}
        inventory={inventory}
        updateInventory={updateInventory}
      />
      <div className="itemLimit">{limit}</div>
      <div className="itemDelete">
        <GrClose />
      </div>
    </li>
  );
};

export default Item;
