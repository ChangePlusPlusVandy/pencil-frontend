/* eslint-disable react/prop-types */
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import './Item.css';

const Item = ({ number, name, limit }) => {
  const handleTextClick = () => {
    console.log('im clicked!');
  };

  return (
    <li className="newItem">
      <div className="dragIcon">
        <GiHamburgerMenu />
      </div>
      <div className="itemOrder">{number + 1}</div>
      <div
        className="itemName"
        onClick={handleTextClick}
        onKeyDown={handleTextClick}
        role="button"
        tabIndex="-1"
      >
        {name}
      </div>
      <div className="itemLimit">{limit}</div>
      <div className="itemDelete">
        <GrClose />
      </div>
    </li>
  );
};

export default Item;
