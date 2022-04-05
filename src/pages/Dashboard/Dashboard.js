import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import PageContainer from '../../components/PageContainer/PageContainer';
import TableHeader from '../../components/TableHeader/TableHeader';
import { useAuth } from '../../AuthContext';

const Dashboard = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  return (
    <PageContainer>
      {Date().getHours > 11 ? (
        <TableHeader title={`Good morning, ${currentUser.displayName}!`} />
      ) : (
        <TableHeader title={`Good afternoon, ${currentUser.displayName}!`} />
      )}
      <div className="todo">
        <h2>To-do</h2>
        <button className="addTask" type="button">
          +
        </button>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
