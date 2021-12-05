/* eslint-disable react/prop-types */
import React from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import './Item.css';

const Item = ({ key, name, limit }) => (
  <div className="newItem">
    <div className="dragIcon">
      <GiHamburgerMenu />
    </div>
    <div className="itemOrder">{key + 1}</div>
    {name}
    {limit}
  </div>
);

export default Item;
