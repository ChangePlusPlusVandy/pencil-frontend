import React, { useState, useEffect } from 'react';
import {
  getAllTransactions,
  approveTransaction,
  denyTransaction,
} from './api-transactions';
import { MiniTransaction } from './MiniTransaction';

const PendingTransactions = () => {
  const [data, setData] = useState([]);

  const approveClick = (e, transaction) => {
    e.preventDefault();
    const tempArr = [...data];
    tempArr.splice(tempArr.indexOf(transaction), 1);
    setData(tempArr);
    approveTransaction(transaction);
  };

  const denyClick = (e, transaction) => {
    e.preventDefault();
    const tempArr = [...data];
    tempArr.splice(tempArr.indexOf(transaction), 1);
    setData(tempArr);
    denyTransaction(transaction);
  };

  useEffect(() => {
    getAllTransactions().then((transactions) => {
      if (transactions.error) {
        console.log(transactions.error);
      } else {
        setData(transactions);
      }
    });
  }, []);

  return (
    <div className="transactions">
      <h1>Transactions</h1>
      <p id="date">Date/Time</p>
      <p id="name">Name</p>
      <p id="status">Status</p>
      <select name="options" id="options">
        <option value="pending">Pending</option>
        <option value="accepted">Accepted</option>
        <option value="denied">Denied</option>
        <option value="all">All</option>
      </select>
      <div className="scrollingTransactions">
        {data.map((item, index) => (
          <MiniTransaction
            transaction={item}
            teacher={item.teacherId}
            createdAt={item.createdAt}
            approveClick={approveClick}
            denyClick={denyClick}
            isChecked={false}
          />
        ))}
      </div>
    </div>
  );
};

const Transactions = () => (
  <div>
    <PendingTransactions />
  </div>
);

export default Transactions;
