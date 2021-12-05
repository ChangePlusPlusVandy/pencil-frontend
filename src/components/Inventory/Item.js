/* eslint-disable react/prop-types */
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import './Item.css';

const Item = ({ number, name, limit }) => (
  <li className="newItem">
    <div className="dragIcon">
      <GiHamburgerMenu />
    </div>
    <div className="itemOrder">{number + 1}</div>
    {name}
    {limit}
  </li>
);

export default Item;
