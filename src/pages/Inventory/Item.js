import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as HamburgerIcon } from '../../assets/HamburgerIcon.svg';
import { ReactComponent as DeleteItem } from '../../assets/DeleteItem.svg';
import './Item.css';
import EditableText from './EditableText';

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
    <li className={`newItem${active ? ' setColorBlue' : ''}`}>
      <div
        className="dragIcon"
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
        role="button"
        tabIndex={0}
      >
        <HamburgerIcon className="dragIcon" />
      </div>
      <div className="itemOrder">{number + 1}</div>
      <EditableText
        className="itemName"
        role="button"
        tabIndex="-1"
        widthSize="20"
        initValue={itemName}
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
        onClick={() => handleDelete(itemName)}
        onKeyPress={() => {}}
      >
        <DeleteItem />
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
