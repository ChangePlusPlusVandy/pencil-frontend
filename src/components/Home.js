import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
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
