import React, { useEffect } from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';
import Navbar from './components/layout/Navbar';
import {
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
import PrivateRoute from './components/auth/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import NewCourse from './pages/teaching/NewCourse';
import EditCourse from './pages/teaching/EditCourse';
import { Box } from '@mui/material';
import { LayoutProvider } from './context/LayoutContext';
import Footer from './components/layout/Footer';
import { SyllabusProvider } from './context/SyllabusContext';
import SyllabusTab from './components/teaching/edit/syllabus/SyllabusTab';
import InformationTab from './components/teaching/edit/information/InformationTab';
import EditLessonsDetails from './pages/teaching/EditLessonsDetails';
import LessonDetails from './components/teaching/edit/lesson_edit/LessonDetails';
import './aceConfig';
import ChecklistTab from './components/teaching/edit/checklist/ChecklistTab';
import ReviewsTab from './components/teaching/edit/reviews/ReviewsTab';
import EnrollmentsTab from './components/teaching/edit/enrollments/EnrollmentsTab';
import CourseActivityTab from './components/teaching/edit/activity/CourseActivityTab';
import CourseEngagementTab from './components/teaching/edit/engagement/CourseEngagementTab';
import AssesmentsAnalyticsTab from './components/teaching/edit/assessments/AssesmentsAnalyticsTab';
import CoursePublicationTab from './components/teaching/edit/publication/CoursePublicationTab';
import LearningPage from './pages/learning/LearningPage';
import ActiveCoursesTab from './components/learning/ActiveCoursesTab';
import FavouriteCoursesTab from './components/learning/FavouriteCoursesTab';
import WishlistedCoursesTab from './components/learning/WishlistedCoursesTab';
import LearningCourseDetails from './pages/learning/LearningCourseDetails';
import LearningSyllabusTab from './components/learning/syllabus/SyllabusTab';
import LearningReviewsTab from './components/learning/reviews/ReviewsTab';
import LearnerReview from './components/learning/reviews/LearnerReview';
import LearningLessonPage from './pages/learning/LearningLessonPage';
import LearningLessonStep from './pages/learning/LearningLessonStep';
import NotFound from './pages/NotFound';
import InternalServerError from './pages/InternalServerError';

const router = createBrowserRouter([{ path: '*', Component: Root }]);

function Root() {
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
            <Route path='checklist' element={<ChecklistTab />} />
            <Route path='reviews' element={<ReviewsTab />} />
            <Route path='enrollments' element={<EnrollmentsTab />} />
            <Route path='activity' element={<CourseActivityTab />} />
            <Route path='engagement' element={<CourseEngagementTab />} />
            <Route path='assessments' element={<AssesmentsAnalyticsTab />} />
            <Route path='publication' element={<CoursePublicationTab />} />

            <Route index element={<Navigate to='information' replace />} />
          </Route>

          <Route path='/teaching/edit-lessons/:courseId' element={<EditLessonsDetails />}>
            <Route path='lessons/:lessonId' element={<LessonDetails />} />
          </Route>

          {/* Learning */}
          <Route path='/learning' element={<LearningPage />}>
            <Route path='courses/active' element={<ActiveCoursesTab />} />
            <Route path='courses/favourites' element={<FavouriteCoursesTab />} />
            <Route path='courses/wishlist' element={<WishlistedCoursesTab />} />
            <Route index element={<Navigate to='courses/active' replace />} />
          </Route>

          <Route path='/learning/courses/:courseId' element={<LearningCourseDetails />}>
            {/* <Route path='lessons/:lessonId' element={<LessonDetails />} /> */}
            <Route path='syllabus' element={<LearningSyllabusTab />} />
            <Route path='reviews' element={<LearningReviewsTab />} />
            <Route path='review' element={<LearnerReview />} />

            <Route index element={<Navigate to='syllabus' replace />} />
          </Route>

          <Route
            path='/learning/course/:courseId/lessons/:lessonId'
            element={<LearningLessonPage />}
          >
            <Route path='step/:stepOrder' element={<LearningLessonStep />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
        <Route path='/500' element={<InternalServerError />} />
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
