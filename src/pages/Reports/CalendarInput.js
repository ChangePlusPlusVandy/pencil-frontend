/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState, useRef } from 'react';
import Pikaday from 'pikaday';
import PropTypes from 'prop-types';
import {
  AiTwotoneCalendar,
  AiOutlineMinus,
  AiOutlineClose,
} from 'react-icons/ai';
import './CalendarInput.css';

const CalendarInput = ({ fromDate, setFromDate, untilDate, setUntilDate }) => {
  const detectOutsideClickRef = useRef(null); // ref to close calendar when outisde of component is clicked
  const [calendarTrigger, setCalendarTrigger] = useState(false);
  const [isFromSelected, setIsFromSelected] = useState(false);
  const [isUntilSelected, setIsUntilSelected] = useState(false);
  const calendarContainer = useRef(null);
  const calendarFrom = useRef(null);
  const calendarUntil = useRef(null);
  const calendarFromButton = useRef(null);
  const calendarUntilButton = useRef(null);

  const dateToString = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  useEffect(() => {
    // Until Calendar
    const pikaUntil = new Pikaday({
      field: calendarUntil.current,
      format: 'DD/MM/YYYY',
      container: calendarContainer.current,
      trigger: calendarUntilButton.current,
      bound: true,
      theme: 'triangle-theme calendar-theme',
      toString: dateToString,
      onSelect: (date) => {
        const newUntilDate = pikaUntil.toString(date);
        setUntilDate(newUntilDate);
        calendarUntil.current.value = `${newUntilDate}`;
      },
    });
    // From Calendar
    const pikaFrom = new Pikaday({
      field: calendarFrom.current,
      format: 'DD/MM/YYYY',
      container: calendarContainer.current,
      trigger: calendarFromButton.current,
      bound: true,
      theme: 'triangle-theme calendar-theme',
      toString: dateToString,
      onSelect: (date) => {
        const newFromDate = pikaFrom.toString(date);
        setFromDate(newFromDate);
        calendarFrom.current.value = `${newFromDate}`;
      },
    });
  }, []);

  useEffect(() => {
    // Alert if clicked on outside of element
    const handleClickOutside = (event) => {
      if (
        detectOutsideClickRef.current &&
        !detectOutsideClickRef.current.contains(event.target)
      ) {
        setCalendarTrigger(false);
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [detectOutsideClickRef]);

  return (
    <div ref={detectOutsideClickRef} className="calendarContainer">
      <div
        className="secondaryInput calendarInput"
        onClick={() => setCalendarTrigger(true)}
      >
        <AiTwotoneCalendar
          size="18"
          className={`calendarIcon ${
            fromDate !== '' || untilDate !== '' ? 'selectedBlue' : ''
          }`}
        />
        <div
          type="button"
          className={`calendarButton ${
            isFromSelected ? 'calendarSelected' : ''
          }`}
          tabIndex="0"
          ref={calendarFromButton}
          onClick={() => setIsFromSelected(true)}
          onBlur={() => setIsFromSelected(false)}
        >
          {fromDate === '' ? 'Start Date' : fromDate}
        </div>
        <AiOutlineMinus size="20" />
        <div
          type="button"
          className={`calendarButton ${
            isUntilSelected ? 'calendarSelected' : ''
          }`}
          tabIndex="0"
          ref={calendarUntilButton}
          onClick={() => setIsUntilSelected(true)}
          onBlur={() => setIsUntilSelected(false)}
        >
          {untilDate === '' ? 'End Date' : untilDate}
        </div>
        <AiOutlineClose
          className={`clearButton ${
            fromDate === '' && untilDate === '' ? 'transparent' : ''
          }`}
          size="16"
          onClick={() => {
            setFromDate('');
            setUntilDate('');
            calendarFrom.current.value = '';
            calendarUntil.current.value = '';
          }}
        />
      </div>
      <div
        className={`${calendarTrigger ? '' : 'calendarHide'}`}
        style={{
          position: 'absolute',
          width: '255px',
          height: '200px',
        }}
      >
        <div ref={calendarContainer} />
        <div ref={calendarFrom} style={{ display: 'none' }} />
        <div ref={calendarUntil} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

CalendarInput.propTypes = {
  fromDate: PropTypes.string.isRequired,
  setFromDate: PropTypes.func.isRequired,
  untilDate: PropTypes.string.isRequired,
  setUntilDate: PropTypes.func.isRequired,
};

export default CalendarInput;
