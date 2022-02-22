import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import { getTransactions } from './api-dashboard';

const PendingTransactions = () => {
  useEffect(() => {
    getTransactions().then((transaction) => {
      console.log(transaction);
      if (transaction.error) {
        console.log(transaction.error);
      } else {
        console.log('yeah');
      }
    });
  }, []);

  return (
    <div className="scrollingTransactions">
      <h1>hey</h1>
    </div>
  );
};

const Dashboard = () => (
  <div>
    <Link to="/">Back</Link>
    <PendingTransactions />
  </div>
);

export default Dashboard;
