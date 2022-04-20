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
          <p className="dashboardTitle">Today at a glance</p>
          <div className="cardRow">
            <Card
              value="$12345"
              title="Total value donated"
              icon={<AiFillDollarCircle size="30" />}
              valueColor="rgba(47, 181, 101, 0.84)"
              size="wide"
            />
            <Card
              value="$12345"
              title="Average value taken per teacher"
              icon={<BsFillPersonFill size="28" />}
              valueColor="rgba(241, 189, 56, 0.8)"
            />
          </div>
        </div>
        <div className="dashboardRight">
          <p className="dashboardTitle">{currentYear} at a glance</p>
          <div className="cardRow">
            <Card
              value="$12345"
              title="Total value donated"
              icon={<AiFillDollarCircle size="30" />}
              valueColor="rgba(47, 181, 101, 0.84)"
              size="wide"
            />
            <Card
              value="$12345"
              title="Average value taken per teacher"
              icon={<BsFillPersonFill size="28" />}
              valueColor="rgba(241, 189, 56, 0.8)"
            />
          </div>
          <div className="cardRow">
            <Card
              value="$12345"
              title="Teachers shopped"
              icon={<AiFillShopping size="32" />}
              valueColor="rgba(113, 195, 231, 1)"
            />
            <Card
              value="$12345"
              title="Pencils taken by teachers"
              icon={<FaPencilAlt size="28" />}
              valueColor="rgba(47, 181, 101, 0.84)"
              size="wide"
            />
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
