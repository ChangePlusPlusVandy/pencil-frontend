/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const [menu, setMenu] = useState(0);

  return (
    <div className="menu">
      <Link to="/dashboard" className="link">
        <button
          type="button"
          className={`button ${menu === 0 ? 'dark-button' : ''}`}
          onClick={() => setMenu(0)}
        >
          <text>Dashboard</text>
        </button>
      </Link>
      <Link to="/inventory" className="link">
        <button
          type="button"
          className={`button ${menu === 1 ? 'dark-button' : ''}`}
          onClick={() => setMenu(1)}
        >
          <text>Inventory</text>
        </button>
      </Link>
      <Link to="/reports" className="link">
        <button
          type="button"
          className={`button ${menu === 2 ? 'dark-button' : ''}`}
          onClick={() => setMenu(2)}
        >
          <text>Reports</text>
        </button>
      </Link>
      <Link to="/schedule" className="link">
        <button
          type="button"
          className={`button ${menu === 3 ? 'dark-button' : ''}`}
          onClick={() => setMenu(3)}
        >
          <text>Schedule</text>
        </button>
      </Link>
      <Link to="/transactions" className="link">
        <button
          type="button"
          className={`button ${menu === 4 ? 'dark-button' : ''}`}
          onClick={() => setMenu(4)}
        >
          <text>Transactions</text>
        </button>
      </Link>
    </div>
  );
};

export default Menu;
