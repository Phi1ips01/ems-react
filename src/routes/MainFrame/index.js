import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import User from '../User/user';
import './travel.css';
import { ROUTES } from '../../Routes.constants';
import Admin from '../Admin/admin';
import { useSelector } from 'react-redux';
import Unauthorized from '../Unauthorized/Unauthorized';
import LoginPage from '../Login/Login';
import PrivateRoute from '../../utils/PrivateRoute';

const MainFrame = () => {
  const isAdmin = useSelector((state) => state.auth.isAdmin);
  
  console.log('mainframe',isAdmin);
  return (
    <>
      <Routes>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.ADMIN} element={
          <PrivateRoute role="admin">  
            <Admin />
          </PrivateRoute>
        } />
        <Route path={ROUTES.USER} element={
          <PrivateRoute role="user"> 
            <User />
          </PrivateRoute>
        } />
        <Route path={ROUTES.UNAUTHORIZED} element={<Navigate to={isAdmin ? ROUTES.ADMIN : ROUTES.USER} replace />} />
        {/* <Route path={ROUTES.UNAUTHORIZED} element={<Unauthorized />} /> */}
        <Route path="*" element={<Navigate to={isAdmin ? ROUTES.ADMIN : ROUTES.USER} replace />} />
      </Routes>
    </>
  );
};

export default MainFrame;
