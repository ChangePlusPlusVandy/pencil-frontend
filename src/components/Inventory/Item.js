/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { ReactComponent as HamburgerIcon } from '../../assets/HamburgerIcon.svg';
import { ReactComponent as DeleteItem } from '../../assets/DeleteItem.svg';
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
    <li className={`newItem${active ? ' setColorBlue' : ''}`}>
      <div
        className="dragIcon"
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
      >
        <HamburgerIcon className="dragIcon" />
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
        setActive={setActive}
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
        setActive={setActive}
        isNumber
      />
      <div
        className="itemDelete"
        role="button"
        tabIndex="-1"
        onClick={() => handleDelete(name)}
        onKeyPress={() => {}}
      >
        <DeleteItem />
      </div>
    </li>
  );
};

export default Item;
