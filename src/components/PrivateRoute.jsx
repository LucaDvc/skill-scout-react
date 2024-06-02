import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const { accessToken } = useSelector((state) => state.users);
  const location = useLocation();

  return accessToken ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location.pathname }} />
  );
};

export default PrivateRoute;
