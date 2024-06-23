import { useTheme } from '@emotion/react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Rating,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CourseContent from './CourseContent';
import StarIcon from '@mui/icons-material/Star';
import ReviewsList from './ReviewsList';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistCourse } from '../../../features/catalog/catalogSlice';
import { refreshAuthUser, reset } from '../../../features/users/usersSlice';
import { LoadingButton } from '@mui/lab';
import HtmlContent from '../../HtmlContent';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEnrollCourse } from '../../../hooks/useEnrollCourse';
import { toast } from 'react-toastify';
import Spinner from '../../Spinner';
import PaymentModal from './PaymentModal';

function MainDetailsContent({ course }) {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const dispatch = useDispatch();
  const { isWishlistUpdating } = useSelector((state) => state.catalog);
  const { user, accessToken } = useSelector((state) => state.users);
  const [isWishlisted, setIsWishlisted] = useState(
    user?.wishlist?.some((wishlistedCourse) => wishlistedCourse.id === course.id)
  );
  const isEnrolled = user?.enrolled_courses?.some(
    (enrolledCourse) => enrolledCourse.id === course.id
  );

  const navigate = useNavigate();
  const location = useLocation();

  const bottomContainerStyle = useMemo(
    () => ({
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%', // Full width of the viewport
      maxWidth: '100%', // Prevent the box from exceeding the viewport width
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper, // Use the theme's background color
      zIndex: 1100, // Ensure it's above most other content; adjust as needed
    }),
    [theme]
  );

  const { loading, error, success, handleEnroll } = useEnrollCourse();

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const handleClosePaymentModal = () => setPaymentModalOpen(false);

  const handleBuyButtonClick = () => {
    if (accessToken) {
      if (course.price == 0) {
        handleEnroll(course.id);
      } else {
        setPaymentModalOpen(true);
      }
      setTimeout(() => {
        dispatch(refreshAuthUser());
      }, 1500);
    } else {
      navigate('/login', { state: { from: location.pathname } });
    }
  };

  useEffect(() => {
    if (success) {
      navigate(`/learning/courses/${course.id}/syllabus`);
      toast.success('You have successfully joined the course');
    }

    if (error) {
      toast.error('An error occurred. Please try again later.');
    }
  }, [success, error, navigate]);

  const handleWishlistButtonClick = () => {
    if (accessToken) {
      dispatch(wishlistCourse(course.id));
      setTimeout(() => {
        dispatch(refreshAuthUser());
        setIsWishlisted(!isWishlisted);
      }, 1500);
    } else {
      navigate('/login', { state: { from: location.pathname } });
    }
  };

  useEffect(() => {
    return () => {
      dispatch(reset()); // reset the users stats when the component unmounts
    };
  }, [dispatch]);

  return (
    <Container maxWidth='lg'>
      <PaymentModal
        open={paymentModalOpen}
        handleClose={handleClosePaymentModal}
        price={course.price}
        courseId={course.id}
      />
      {loading && <Spinner />}
      <Grid container spacing={3}>
        {/* Main content */}
        <Grid item xs={12} lg={8} xl={9}>
          <Box
            pb={isLargeScreen ? 0 : 26}
            px={{ xs: 4, sm: 6, md: 12, lg: 8, xl: 0 }}
            pr={{ xl: 16 }}
          >
            <Typography variant='h3' mt={6}>
              About this course
            </Typography>
            <Typography variant='body1' mt={2}>
              <HtmlContent html={course.description} />
            </Typography>

            <Typography variant='h3' mt={6}>
              Initial requirements
            </Typography>
            <Typography variant='body1' mt={2}>
              <HtmlContent html={course.requirements} />
            </Typography>

            <Typography variant='h3' mt={6}>
              Meet the Instructor
            </Typography>
            <Stack
              spacing={2}
              mt={2}
              flexDirection='row'
              justifyContent='flex-start'
              alignItems='flex-start'
              useFlexGap
            >
              <Avatar
                src={course.instructor?.picture}
                alt={course.instructor?.first_name + ' ' + course.instructor?.last_name}
                variant='rounded'
                sx={{ width: 98, height: 98 }}
              />
              <Stack spacing={1}>
                <Link to={`/users/${course.instructor?.id}`} className='link-no-style'>
                  <Typography
                    variant='h6'
                    component='span'
                    sx={{ '&:hover': { textDecoration: 'underline' } }}
                  >
                    {course.instructor?.first_name + ' ' + course.instructor?.last_name}
                  </Typography>
                </Link>
                <Typography variant='subtitle2'>
                  {course.instructor?.short_bio}
                </Typography>
              </Stack>
            </Stack>

            <Typography variant='h3' mt={6}>
              Course Content
            </Typography>
            <CourseContent course={course} />

            <Typography variant='h3' mt={6} id='reviews'>
              Learners' reviews
            </Typography>
            <Typography
              variant='h5'
              mt={2}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 2,
              }}
            >
              <StarIcon sx={{ color: '#FFC107', marginRight: 0.25 }} />
              {course.average_rating % 1 === 0
                ? course.average_rating?.toFixed(0)
                : course.average_rating?.toFixed(1)}{' '}
              course rating - {course.reviews?.length} ratings
            </Typography>
            <Divider />
            <ReviewsList reviews={course.reviews} />
          </Box>
        </Grid>

        {/* Sticky side container */}
        <Grid item xs={12} lg={4} xl={3}>
          <Box
            sx={{
              position: isLargeScreen ? 'sticky' : 'static',
              top: isLargeScreen ? 16 : 'auto',
              width: '100%',
              maxWidth: 360, // Maximum width of the sticky Box
              alignSelf: 'flex-start',
              padding: 2,
              ...(isMediumScreen ? bottomContainerStyle : {}),
            }}
          >
            <Typography variant='h3'>
              {course.price == 0 ? 'Free' : `$${course.price}`}
            </Typography>

            {isEnrolled ? (
              <Button
                variant='contained'
                color='primary'
                fullWidth
                sx={{ my: 1 }}
                onClick={() => navigate(`/learning/courses/${course.id}/syllabus`)}
              >
                <Typography variant='h5'>Go to course</Typography>
              </Button>
            ) : (
              <Button
                variant='contained'
                color='primary'
                fullWidth
                sx={{ my: 1 }}
                onClick={handleBuyButtonClick}
              >
                <Typography variant='h5'>
                  {course.price == 0 ? 'Join this course' : 'Buy'}
                </Typography>
              </Button>
            )}

            <LoadingButton
              variant='outlined'
              color='primary'
              fullWidth
              sx={{ my: 1 }}
              startIcon={isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={handleWishlistButtonClick}
              loading={isWishlistUpdating}
              loadingPosition='start'
            >
              <span>
                <Typography variant='h5'>
                  {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                </Typography>
              </span>
            </LoadingButton>
            {/* <Button
              variant='outlined'
              color='primary'
              fullWidth
              sx={{ my: 1 }}
              startIcon={
                isWishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />
              }
              onClick={handleWishlistButtonClick}
            >
              <Typography variant='h5'>
                {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
              </Typography>
            </Button> */}

            {/* if wishlisted
            <Button
              variant='outlined'
              color='primary'
              fullWidth
              sx={{ my: 1 }}
              startIcon={<FavoriteIcon />}
            >
              <Typography variant='h5'>In Wishlist</Typography>
            </Button> */}

            <Typography variant='h5'>Share</Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MainDetailsContent;
