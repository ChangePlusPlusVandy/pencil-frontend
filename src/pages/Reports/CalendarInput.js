/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useRef } from 'react';
import Pikaday from 'pikaday';
import PropTypes from 'prop-types';

const CalendarInput = ({ fromDate, setFromDate, untilDate, setUntilDate }) => {
  const detectOutsideClickRef = useRef(null); // ref to close calendar when outisde of component is clicked
  const [calendarTrigger, setCalendarTrigger] = useState(false);
  const [calendarBoolean, setCalendarBoolean] = useState(true);
  const calendarContainer = useRef(null);
  const calendarFrom = useRef(null);
  const calendarUntil = useRef(null);
  const calendarFromButton = useRef(null);
  const calendarUntilButton = useRef(null);

  const dateToString = (date, format) => {
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
        setCalendarBoolean(true);
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
        className="calendarInput"
        placeholder="Select Date Range"
        onClick={() => setCalendarTrigger(true)}
      >
        {fromDate}
        {untilDate === '' ? '' : ` - ${untilDate}`}
      </div>
      <div
        className={`${calendarTrigger ? '' : 'calendarHide'}`}
        style={{
          position: 'absolute',
          width: '100%',
          height: '200px',
        }}
      >
        <div ref={calendarContainer}>
          <div
            type="button"
            ref={calendarFromButton}
            className={`calendarButton ${
              calendarBoolean ? 'calendarSelected' : ''
            }`}
            onClick={() => setCalendarBoolean(true)}
          >
            From
          </div>
          <div
            type="button"
            ref={calendarUntilButton}
            className={`calendarButton ${
              calendarBoolean ? '' : 'calendarSelected'
            }`}
            onClick={() => setCalendarBoolean(false)}
          >
            Until
          </div>
        </div>
        <input ref={calendarFrom} style={{ display: 'none' }} />
        <input ref={calendarUntil} style={{ display: 'none' }} />
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
