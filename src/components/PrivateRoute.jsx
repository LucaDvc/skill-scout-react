import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { accessToken } = useSelector((state) => state.users);

  return accessToken ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
