import React, { useState, useEffect } from 'react';
import PageContainer from '../../components/PageContainer/PageContainer';
import { useAuth } from '../../AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const [info, setInfo] = useState([]);
  const { currentUser } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <PageContainer>
      <h1>Good afternoon, {currentUser.displayName.split(' ')[0]}! </h1>
      <div className="dashboardContainer">
        <div className="dashboardLeft">
          <p>Today at a glance</p>
          <div className="cardRegular">
            <div>$12343</div>
            <div>Total value donated</div>
            <div>Icon</div>
          </div>
        </div>
        <div className="dashboardRight">{currentYear} at a glance</div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
