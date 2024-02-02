import React, { useEffect } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Catalog from './pages/catalog/Catalog';
import Login from './pages/users/auth/Login';
import Register from './pages/users/auth/Register';
import NotifyConfirmEmail from './pages/users/auth/NotifyConfirmEmail';
import ConfirmEmail from './pages/users/auth/ConfirmEmail';
import { useDispatch, useSelector } from 'react-redux';
import { logout, refreshAccessToken } from './features/users/usersSlice';
import ProfileEdit from './components/ProfileEdit';
import ForgotPassword from './pages/users/auth/ForgotPassword';
import ResetPassword from './pages/users/auth/ResetPassword';
import CatalogSearch from './pages/catalog/CatalogSearch';
import CourseDetails from './pages/catalog/CourseDetails';
import TeachingCoursesOverview from './pages/teaching/TeachingCoursesOverview';
import PrivateRoute from './components/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import NewCourse from './pages/teaching/NewCourse';

function App() {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((state) => state.users);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (!accessToken && !refreshToken) {
        dispatch(logout());
      }

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
          {/* Catalog */}
          <Route path='/' element={<Catalog />} />
          <Route path='/catalog' element={<Catalog />} />
          <Route path='/catalog/search' element={<CatalogSearch />} />
          <Route
            path='/catalog/courses/:courseId'
            element={<CourseDetails />}
          />

          {/* Auth */}
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/notify-confirm-email'
            element={<NotifyConfirmEmail />}
          />
          <Route path='/confirm-email' element={<ConfirmEmail />} />

          {/* Users */}
          <Route path='/profile' element={<ProfileEdit />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />

          <Route path='' element={<PrivateRoute />}>
            {/* Teaching */}
            <Route path='/teaching' element={<TeachingCoursesOverview />} />
            <Route path='/teaching/courses/new' element={<NewCourse />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer />
    </>
  );
}

export default App;
