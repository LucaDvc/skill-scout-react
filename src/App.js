import React, { useEffect } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
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
import EditCourse from './pages/teaching/EditCourse';
import { Box } from '@mui/material';
import { LayoutProvider } from './context/LayoutContext';
import Footer from './components/Footer';
import { SyllabusProvider } from './context/SyllabusContext';
import SyllabusTab from './components/teaching/edit/syllabus/SyllabusTab';
import InformationTab from './components/teaching/edit/information/InformationTab';

const router = createBrowserRouter([{ path: '*', Component: Root }]);

function Root() {
  // 2️⃣ `BrowserRouter` component removed, but the <Routes>/<Route>
  // component below are unchanged
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Catalog */}
        <Route path='/' element={<Catalog />} />
        <Route path='/catalog' element={<Catalog />} />
        <Route path='/catalog/search' element={<CatalogSearch />} />
        <Route path='/catalog/courses/:courseId' element={<CourseDetails />} />

        {/* Auth */}
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/notify-confirm-email' element={<NotifyConfirmEmail />} />
        <Route path='/confirm-email' element={<ConfirmEmail />} />

        {/* Users */}
        <Route path='/profile' element={<ProfileEdit />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />

        <Route path='' element={<PrivateRoute />}>
          {/* Teaching */}
          <Route path='/teaching' element={<TeachingCoursesOverview />} />
          <Route path='/teaching/courses/new' element={<NewCourse />} />

          <Route path='/teaching/courses/:courseId' element={<EditCourse />}>
            <Route path='information' element={<InformationTab />} />
            <Route
              path='syllabus'
              element={
                <SyllabusProvider>
                  <SyllabusTab />
                </SyllabusProvider>
              }
            />
            <Route index element={<Navigate to='information' replace />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <LayoutProvider>
        <RouterProvider router={router} />
      </LayoutProvider>
    </Box>
  );
}

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer position='bottom-center' />
    </>
  );
}

export default App;
