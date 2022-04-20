import React, { useState, useEffect } from 'react';
import {
  AiTwotoneCalendar,
  AiFillShopping,
  AiFillDollarCircle,
} from 'react-icons/ai';
import { BsFillPersonFill } from 'react-icons/bs';
import { FaPencilAlt } from 'react-icons/fa';
import Card from '../../components/Card/Card';
import PageContainer from '../../components/PageContainer/PageContainer';
import { useAuth } from '../../AuthContext';
import { getDailyStats, getYearlyStats } from './api-dashboard';
import { formatDollar } from '../../utils/stringFormatters';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser, currentLocation } = useAuth();
  const currentYear = new Date().getFullYear();
  const [dailyStats, setDailyStats] = useState([]);
  const [yearlyStats, setYearlyStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    try {
      const daily = await getDailyStats(currentLocation);
      const yearly = await getYearlyStats(currentLocation);
      setDailyStats(daily);
      setYearlyStats(yearly);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <PageContainer>
      <h1>Good afternoon, {currentUser.displayName.split(' ')[0]}! </h1>
      {!isLoading && (
        <div className="dashboardContainer">
          <div className="dashboardLeft">
            <p className="dashboardTitle">Today at a glance</p>
            <div className="cardRow">
              <Card
                value={dailyStats.numAppointments}
                title="Appointments scheduled today"
                icon={<AiTwotoneCalendar size="30" />}
                valueColor="rgba(47, 181, 101, 0.84)"
              />
              <Card
                value="1"
                title="Something else"
                icon={<BsFillPersonFill size="28" />}
                valueColor="rgba(241, 189, 56, 0.8)"
              />
            </div>
          </div>
          <div className="dashboardRight">
            <p className="dashboardTitle">{currentYear} at a glance</p>
            <div className="cardRow">
              <Card
                value={formatDollar(yearlyStats.totalValue, true)}
                title="Total value donated"
                icon={<AiFillDollarCircle size="30" />}
                valueColor="rgba(47, 181, 101, 0.84)"
                size="wide"
              />
              <Card
                value={formatDollar(yearlyStats.averageValue)}
                title="Average value taken per teacher"
                icon={<BsFillPersonFill size="28" />}
                valueColor="rgba(241, 189, 56, 0.8)"
              />
            </div>
            <div className="cardRow">
              <Card
                value={yearlyStats.numAppointments}
                title="Teachers shopped"
                icon={<AiFillShopping size="32" />}
                valueColor="rgba(113, 195, 231, 1)"
              />
              <Card
                value={yearlyStats.numPencil}
                title="Pencils taken by teachers"
                icon={<FaPencilAlt size="28" />}
                valueColor="rgba(47, 181, 101, 0.84)"
                size="wide"
              />
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default Dashboard;
