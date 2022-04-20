import React, { useState, useEffect } from 'react';
import { AiTwotoneCalendar } from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import Card from '../../components/Card/Card';
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
          <Card
            value="$12345"
            title="Total value donated"
            icon={<AiTwotoneCalendar size="28" />}
            valueColor="rgba(47, 181, 101, 0.84)"
            size="wide"
          />
          <Card
            value="$12345"
            title="Average value taken per teacher"
            icon={<BsFillPersonFill size="28" />}
            valueColor="rgba(47, 181, 101, 0.84)"
          />
        </div>
        <div className="dashboardRight">{currentYear} at a glance</div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
