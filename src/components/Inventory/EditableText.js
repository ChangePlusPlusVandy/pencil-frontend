/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import Field from './FieldText';
import './EditableText.css';

const EditableText = (props) => {
  // eslint-disable-next-line react/prop-types
  const { initValue } = props;
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
  };

  // when user presses Enter
  const handleEnter = (event) => {
    console.log('ENTERED');
    if (event.code === 'Enter' || event.charCode === 13 || event.which === 13) {
      setEdit(false);
      setValue(event.target.value);
    }
  };

  // when user clicks on text
  const handleClick = () => {
    setEdit(true);
  };

  return (
    <div className="editableText">
      {edit ? (
        // edit mode
        <Field
          autoFocus
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
