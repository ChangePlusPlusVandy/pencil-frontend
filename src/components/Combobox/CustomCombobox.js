import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Combobox } from '@headlessui/react';
import { FaCheck } from 'react-icons/fa';
import { HiSelector } from 'react-icons/hi';
import './CustomCombobox.css';

const CustomCombobox = ({ data, onChange, disabled }) => {
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
            autoComplete="off"
            className="comboboxInput"
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="comboboxButton vertical-align-center">
            <HiSelector />
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
                    className={`${
                      selected ? 'selectedOption' : 'comboboxOption'
                    } ${active ? ' activeOption' : ''}`}
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
};

CustomCombobox.defaultProps = {
  disabled: false,
};