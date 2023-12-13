import React, { useEffect } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import Register from './pages/Register';
import NotifyConfirmEmail from './pages/NotifyConfirmEmail';
import ConfirmEmail from './pages/ConfirmEmail';
import { useDispatch, useSelector } from 'react-redux';
import { refreshAccessToken } from './features/users/usersSlice';
import ProfileEdit from './components/ProfileEdit';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((state) => state.users);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!accessToken && refreshToken) {
        // If there's no accessToken but we have refreshToken in local storage, try to refresh it
        dispatch(refreshAccessToken());
      }
    };

    checkAuthStatus();
  }, [dispatch, accessToken, refreshToken]);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Catalog />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/notify-confirm-email'
            element={<NotifyConfirmEmail />}
          />
          <Route path='/confirm-email' element={<ConfirmEmail />} />
          <Route path='/profile' element={<ProfileEdit />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          {/* 
      <Route path='/tickets' element={<PrivateRoute />}>
        <Route path='/tickets' element={<Tickets />} />
      </Route>
      <Route path='/ticket/:ticketId' element={<PrivateRoute />}>
        <Route path='/ticket/:ticketId' element={<Ticket />} />
      </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
