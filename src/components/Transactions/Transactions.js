import React, { useState, useEffect } from 'react';
import {
  getAllTransactions,
  approveTransaction,
  denyTransaction,
} from './api-transactions';
import { MiniTransaction } from './MiniTransaction';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';

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
    <div className="scrollingTransactions">
      {data.map((item, index) => (
        <MiniTransaction
          transaction={item}
          teacher={item.teacherId}
          createdAt={item.createdAt}
          approveClick={approveClick}
          denyClick={denyClick}
        />
      ))}
    </div>
  );
};

const Transactions = () => (
  <>
    <Header />
    <Menu />
    <h1>Transactions</h1>
    <PendingTransactions />
  </>
);

export default Transactions;
