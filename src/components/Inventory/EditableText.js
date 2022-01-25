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
}) => {
  const [edit, setEdit] = useState(false);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(initValue);
  }, []);

  // when user clicks out of text
  const handleBlur = (event) => {
    console.log('blurring boi');
    setEdit(false);
    setValue(event.target.value);
    // update the data object in inventory
    const tempInventory = inventory;
    tempInventory.find((x) => x[keyToUpdate].toString() === value)[
      keyToUpdate
    ] = event.target.value;
    updateInventory(tempInventory);
  };

  // when user presses Enter
  const handleEnter = (event) => {
    if (event.code === 'Enter' || event.charCode === 13 || event.which === 13) {
      setEdit(false);
      setValue(event.target.value);
      // update the data object in inventory
      const tempInventory = inventory;
      tempInventory.find((x) => x[keyToUpdate].toString() === value)[
        keyToUpdate
      ] = event.target.value;
      updateInventory(tempInventory);
    }
  };

  // when user clicks on text
  const handleClick = () => {
    setEdit(true);
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
