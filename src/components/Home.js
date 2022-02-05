import React from 'react';
// import Menu from './Menu/Menu';
import { Link } from 'react-router-dom';
import './Menu/Menu.css';

const Home = () => (
  <div style={{ backgroundColor: '#f6f6f6' }}>
    This is the home page
    <br />
    <Link to="/profile">Profile</Link>
    <br />
    <Link to="/inventory">Inventory</Link>
    <br />
    <Link to="/transactions">Transactions</Link>
  </div>
);

export default Home;
