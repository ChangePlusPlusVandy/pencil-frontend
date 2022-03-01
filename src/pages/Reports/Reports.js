/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

import PageContainer from '../../components/PageContainer/PageContainer';
import TableHeader from '../../components/TableHeader/TableHeader';
import CustomDropdown from '../../components/Dropdowns/CustomDropdown';

const Reports = () => {
  const a = 10;
  const [view, setView] = useState('Weekly');

  const menuOptions = ['Weekly', 'School', 'No Show']; // TODO: this needs to be updated

  const menu = (
    <>
      {menuOptions
        // .filter((option) => option !== view)
        .map((option) => (
          <a onClick={(e) => setView(e.target.innerText)}>{option}</a>
        ))}
    </>
  );

  const rightItems = (
    <CustomDropdown title={view} menuItems={menu} type="small" />
  );

  return (
    <PageContainer>
      <TableHeader title="Reports" leftItems={null} rightItems={rightItems} />
    </PageContainer>
  );
};

export default Reports;
