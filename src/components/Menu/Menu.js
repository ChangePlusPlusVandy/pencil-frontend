/* eslint-disable prettier/prettier */
import React from 'react';
import { Link } from "react-router-dom";


const Menu = () => (
	<div className="menu">
		<button type="button" className="button">
      <Link to="/dashboard" className="link">
        Dashboard
      </Link>
    </button>
    <button type="button" className="button">
      <Link to="/profile" className="link">Profile</Link>
    </button>
    <button type="button" className="button">
      <Link to="/inventory" className="link">Inventory</Link>
    </button>
    <button type="button" className="button">
      <Link to="/reports" className="link">Reports</Link>
    </button>
    <button type="button" className="button">
      <Link to="/schedule" className="link">Schedule</Link>
    </button>
    <button type="button" className="button">
      <Link to="/transactions" className="link">Transactions</Link>
    </button>
	</div>
);

export default Menu;
