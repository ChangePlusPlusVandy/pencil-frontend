import React from 'react';
import PropTypes from 'prop-types';

import './TableHeader.css';

const TableHeader = ({ title, leftArea, rightArea }) => (
  <div className="tableHeaderArea">
    <h1 className="tableHeaderTitle">{title}</h1>
    <div className="tableHeaderLeft">{leftArea}</div>
    <div className="tableHeaderRight">{rightArea}</div>
  </div>
);

TableHeader.propTypes = {
  title: PropTypes.string.isRequired,
  leftArea: PropTypes.element,
  rightArea: PropTypes.element,
};

TableHeader.defaultProps = {
  leftArea: null,
  rightArea: null,
};

export default TableHeader;
