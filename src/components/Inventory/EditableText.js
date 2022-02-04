/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import Field from './FieldText';
import './EditableText.css';

const EditableText = ({
  widthSize,
  initValue,
  inventory,
  updateInventory,
  keyToUpdate,
  isNumber,
  setActive,
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
    if (!isNumber || isPositiveInteger(event.target.value)) {
      setValue(event.target.value);
      // update the data object in inventory
      const tempInventory = inventory;
      tempInventory.find((x) => x[keyToUpdate].toString() === value)[
        keyToUpdate
      ] = isNumber ? Number(event.target.value) : event.target.value;
      updateInventory(tempInventory);
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
    <div className={`editableText ${keyToUpdate}`}>
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

export default EditableText;
