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
import Error from '../../components/Error/Error';
import {
  getDailyStats,
  getMonthlyStats,
  getYearlyStats,
} from './api-dashboard';
import { formatDollar } from '../../utils/stringFormatters';
import { formatDateDMY } from '../../utils/timedate';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser, currentLocation } = useAuth();
  const currentYear = new Date().getFullYear();
  const DMY = formatDateDMY(new Date());
  const [dailyStats, setDailyStats] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [yearlyStats, setYearlyStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorDescription, setErrorDescription] = useState(null);

  /**
   * Get stats to display on dashboard
   * */
  useEffect(async () => {
    try {
      const daily = await getDailyStats(currentLocation);
      const monthly = await getMonthlyStats(currentLocation);
      const yearly = await getYearlyStats(currentLocation);
      setDailyStats(daily);
      setMonthlyStats(monthly);
      setYearlyStats(yearly);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
      if (err.response?.data && Object.keys(err.response?.data).length) {
        setErrorDescription(err.response?.data);
      }
    }
  }, []);

  return (
    <PageContainer>
      <>
        {error && (
          <Error
            error={error}
            description={errorDescription}
            setError={setError}
          />
        )}
        <h1>Good afternoon, {currentUser.displayName.split(' ')[0]}! </h1>
        {!isLoading && !error && (
          <div className="dashboardContainer">
            <div className="dashboardLeft">
              <p className="dashboardTitle">Today at a glance - {DMY}</p>
              <div className="cardRow">
                <Card
                  value={dailyStats.numAppointments}
                  title="Appointments scheduled today"
                  icon={<AiTwotoneCalendar size="30" />}
                  valueColor="rgba(241, 189, 56, 0.8)"
                />
                <Card
                  value={formatDollar(dailyStats.totalValue, true)}
                  title="Total value donated"
                  icon={<BsFillPersonFill size="28" />}
                  valueColor="rgba(47, 181, 101, 0.84)"
                  size="wide"
                />
              </div>
              <p className="dashboardTitle">This month at a glance</p>
              <div className="cardRow">
                <Card
                  value={formatDollar(monthlyStats.totalValue, true)}
                  title="Total value donated"
                  icon={<AiTwotoneCalendar size="30" />}
                  valueColor="rgba(47, 181, 101, 0.84)"
                  size="wide"
                />
                <Card
                  value={monthlyStats.numAppointments}
                  title="Teachers shopped"
                  icon={<BsFillPersonFill size="28" />}
                  valueColor="rgba(113, 195, 231, 1)"
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
              <p className="dashboardTitle" style={{ visibility: 'hidden' }}>
                This will be hidden
              </p>
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
      </>
    </PageContainer>
  );
};

export default Dashboard;
