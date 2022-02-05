/* eslint-disable prettier/prettier */
import React from 'react';
import { Link } from "react-router-dom";
import './Menu.css';

const Menu = () => (
	<div className="menu">
    <Link to="/dashboard" className="link">
		  <button type="button" className="button">
        Dashboard
      </button>
    </Link>
    <Link to="/inventory" className="link">
      <button type="button" className="button">
        Inventory
      </button>
    </Link>
    <Link to="/reports" className="link">
      <button type="button" className="button">
        Reports
      </button>
    </Link>
    <Link to="/schedule" className="link">
      <button type="button" className="button">
        Schedule
      </button>
    </Link>
    <Link to="/transactions" className="link">
      <button type="button" className="button">
        Transactions
      </button>
    </Link>
	</div>
);

export default Menu;
