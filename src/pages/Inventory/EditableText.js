import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Field from './FieldText';
import './EditableText.css';

const EditableText = ({
  widthSize,
  initValue,
  itemName,
  inventory,
  updateInventory,
  keyToUpdate,
  isNumber,
  setActive,
  cssClass,
}) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(initValue);
  }, []);

  const isPositiveInteger = (string) => {
    if (typeof string !== 'string') {
      return false;
    }
    const num = Number(string);
    if (Number.isInteger(num) && num > 0) {
      return true;
    }
    return false;
  };

  // when user clicks out of text
  const handleBlur = (event) => {
    setEdit(false);
    setActive(false);
    if (!isNumber) {
      console.log('leaving blur', inventory);
      const newArr = inventory.filter(
        (item) => item.itemName === event.target.value
      );

      console.log(newArr);

      if (newArr.length > 1) {
        console.log('Cant have duplicate entries!');
        return;
      }
    }
    if (!isNumber || isPositiveInteger(event.target.value)) {
      setValue(event.target.value);
      // update the data object in inventory
      const tempInventory = inventory;
      console.log(
        itemName,
        tempInventory.find(
          (x) => (x.itemName || x['Item.itemName']) === itemName
        )
      );
      tempInventory.find(
        (x) => (x.itemName || x['Item.itemName']) === itemName
      )[keyToUpdate] = isNumber
        ? Number(event.target.value)
        : event.target.value;
      updateInventory(tempInventory);
      console.log('bro', tempInventory);
    }
  };

  // when user presses Enter
  const handleEnter = (event) => {
    if (event.code === 'Enter' || event.charCode === 13 || event.which === 13) {
      setEdit(false);
      setActive(false);
      if (!isNumber || isPositiveInteger(event.target.value)) {
        setValue(event.target.value);
        // update the data object in inventory
        const tempInventory = inventory;
        tempInventory.find((x) => x[keyToUpdate].toString() === value)[
          keyToUpdate
        ] = isNumber ? Number(event.target.value) : event.target.value;
        updateInventory(tempInventory);
      }
    }
  };

  // when user clicks on text
  const handleClick = () => {
    setEdit(true);
    setActive(true);
  };

  return (
    <div className={`editableText ${cssClass}`}>
      {edit ? (
        // edit mode
        <Field
          autoFocus
          widthSize={widthSize}
          defaultValue={value}
          onBlur={handleBlur}
          onKeyPress={handleEnter}
          isNumber={isNumber}
          setActive={setActive}
        />
      ) : (
        // view mode
        // <p> element is interactive element
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <p onClick={handleClick} onKeyPress={handleClick}>
          {value}
        </p>
      )}
    </div>
  );
};

EditableText.propTypes = {
  widthSize: PropTypes.number.isRequired,
  initValue: PropTypes.string.isRequired,
  inventory: PropTypes.shape.isRequired,
  updateInventory: PropTypes.func.isRequired,
  keyToUpdate: PropTypes.string.isRequired,
  isNumber: PropTypes.bool.isRequired,
  setActive: PropTypes.func.isRequired,
  cssClass: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired,
};

export default EditableText;
