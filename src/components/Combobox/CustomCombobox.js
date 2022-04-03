/* eslint-disable import/no-unresolved */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Combobox } from '@headlessui/react';
import { FaCheck } from 'react-icons/fa';
import { HiSelector } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import './CustomCombobox.css';

const CustomCombobox = ({
  data,
  onChange,
  disabled,
  size,
  placeholder,
  icon,
}) => {
  if (disabled) return <div />;

  const [selectedData, setSelectedData] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    onChange(selectedData);
  }, [selectedData]);

  const filteredData =
    query === ''
      ? data
      : data.filter((item) => item.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="customCombobox">
      <Combobox value={selectedData} onChange={setSelectedData}>
        <div className="vertical-align-center">
          <Combobox.Input
            placeholder={placeholder}
            autoComplete="off"
            className={`comboboxInput ${size}`}
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="comboboxButton vertical-align-center">
            {icon}
          </Combobox.Button>
          <Combobox.Button
            className={`vertical-align-center comboboxClearButton ${
              selectedData === '' && 'transparent'
            }`}
          >
            <AiOutlineClose size="16" onClick={() => setSelectedData('')} />
          </Combobox.Button>
        </div>
        <Combobox.Options className="comboboxOptions">
          {filteredData.length === 0 && query !== '' ? (
            <div className="disabledOption">Nothing found</div>
          ) : (
            filteredData.map((item) => (
              <Combobox.Option key={item} value={item}>
                {({ active, selected }) => (
                  <li
                    className={`comboboxOption ${size}
                    ${selected && 'selectedOption'} 
                    ${active && 'activeOption'}`}
                  >
                    {selected && <FaCheck />}
                    {item}
                  </li>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  );
};

export default CustomCombobox;

CustomCombobox.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.element,
};

CustomCombobox.defaultProps = {
  disabled: false,
  size: 'large',
  placeholder: '',
  icon: <HiSelector />,
};
