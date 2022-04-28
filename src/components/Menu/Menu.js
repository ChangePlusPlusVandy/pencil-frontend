import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
  const [menu, setMenu] = useState(null);

  useEffect(() => {
    switch (window.location.href.split('/')[3]) {
      case 'dashboard':
        setMenu(0);
        break;
      case 'inventory':
        setMenu(1);
        break;
      case 'reports':
        setMenu(2);
        break;
      case 'schedule':
        setMenu(3);
        break;
      case 'transactions':
        setMenu(4);
        break;
      default:
        setMenu(-1);
    }
  }, []);

  return (
    <div className="menu">
      <div>
        <Link to="/dashboard" className="link" tabIndex="-1">
          <button
            type="button"
            className={`menuButton ${menu === 0 ? 'dark-button' : ''}`}
            onClick={() => setMenu(0)}
          >
            <div className="menuOptionText">Dashboard</div>{' '}
          </button>
        </Link>
        <Link to="/inventory" className="link" tabIndex="-1">
          <button
            type="button"
            className={`menuButton ${menu === 1 ? 'dark-button' : ''}`}
            onClick={() => setMenu(1)}
          >
            <div className="menuOptionText">Inventory</div>
          </button>
        </Link>
        <Link to="/reports" className="link" tabIndex="-1">
          <button
            type="button"
            className={`menuButton ${menu === 2 ? 'dark-button' : ''}`}
            onClick={() => setMenu(2)}
          >
            <div className="menuOptionText">Reports</div>
          </button>
        </Link>
        <Link to="/schedule" className="link" tabIndex="-1">
          <button
            type="button"
            className={`menuButton ${menu === 3 ? 'dark-button' : ''}`}
            onClick={() => setMenu(3)}
          >
            <div className="menuOptionText">Schedule</div>
          </button>
        </Link>
        <Link to="/transactions" className="link" tabIndex="-1">
          <button
            type="button"
            className={`menuButton ${menu === 4 ? 'dark-button' : ''}`}
            onClick={() => setMenu(4)}
          >
            <div className="menuOptionText">Transactions</div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
