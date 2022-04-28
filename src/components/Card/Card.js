import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

const Card = ({ value, title, icon, valueColor, size }) => (
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

export default Card;

Card.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string,
  icon: PropTypes.node.isRequired,
  valueColor: PropTypes.string,
  size: PropTypes.string,
};

Card.defaultProps = {
  value: '0',
  title: 'Empty card',
  valueColor: '#000',
  size: '',
};
