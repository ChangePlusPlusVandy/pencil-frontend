import React from 'react';
import { useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ForgotPassword from './ForgotPassword';
import PencilLogo from '../../assets/pencil-logo-crop.png';
import './Authentication.css';

const Authentication = () => {
  const location = useLocation();
  console.log(location.pathname);

  const toRender = () => {
    if (location.pathname === '/login') return <Login />;
    if (location.pathname === '/register') return <Register />;
    if (location.pathname === '/forgot-password') return <ForgotPassword />;
    return <Login />;
  };

  return (
    <div className="authContainer">
      <div className="authLeftCol">Fancy Graphic</div>
      <div className="authRightCol">
        <div className="authFormContainer">
          <p className="authPencilHeader">
            <img src={PencilLogo} alt="Pencil Logo" className="header_logo" />
            PENCIL
          </p>
          {toRender()}
        </div>
      </div>
    </div>
  );
};

export default Authentication;
