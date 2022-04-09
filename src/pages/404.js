import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    404
    <br />
    <Link to="/dashboard">Go back home</Link>
  </div>
);

export default NotFound;
