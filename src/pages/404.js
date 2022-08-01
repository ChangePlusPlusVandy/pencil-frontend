import React from 'react';
import { Link } from 'react-router-dom';
import PageContainer from '../components/PageContainer/PageContainer';
import Logo404 from '../assets/404.png';
import './404.css';

const NotFound = () => (
  <PageContainer>
    <div className="logo404">
      <img src={Logo404} alt="404 Error" />
      <h2>Whoops... let&apos;s get you back on track.</h2>
      <p>The page you are looking for can not be found at this time.</p>
      <Link to="/dashboard" className="primaryButton">
        Back to Dashboard
      </Link>
    </div>
  </PageContainer>
);

export default NotFound;
