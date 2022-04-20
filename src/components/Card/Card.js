import React, { useState } from 'react';
import './Card.css';
import PropTypes from 'prop-types';

const Card = ({ value, title, icon, valueColor, size }) => {
  const [info, setInfo] = useState([]);

  return (
    <div className={`card ${size}`}>
      <div className="cardBody">
        <div className="cardValue" style={{ color: valueColor }}>
          {value}
        </div>
        <div className="cardTitle">{title}</div>
        <div className="cardIcon">{icon}</div>
      </div>
    </div>
  );
};

export default Card;

Card.propTypes = {
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  valueColor: PropTypes.string,
  size: PropTypes.string,
};

Card.defaultProps = {
  valueColor: '#000',
  size: '',
};
