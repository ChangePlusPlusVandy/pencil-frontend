import React from 'react';
import PropTypes from 'prop-types';

import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import './PageContainer.css';

const PageContainer = ({ children }) => (
  <>
    <Header />
    <Menu />
    <div className="pageContainer">{children}</div>
  </>
);

PageContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageContainer;
