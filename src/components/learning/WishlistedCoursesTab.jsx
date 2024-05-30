import { Box, CircularProgress, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist } from '../../features/learning/learningSlice';
import WishlistCourseCard from './cards/WishlistCourseCard';

function WishlistedCoursesTab() {
  const { courses, isLoading } = useSelector((state) => state.learning.wishlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch, getWishlist]);

  return (
    <Box py={2}>
      <Typography variant='h3' sx={{ mb: 2 }}>
        Wishlist
      </Typography>

      {isLoading ? (
        <CircularProgress />
      ) : (
        <Box display='flex' gap={2} flexDirection='column'>
          {courses.length !== 0 ? (
            courses.map((course) => (
              <WishlistCourseCard key={course.id} course={course} />
            ))
          ) : (
            <Typography variant='body1'>You have no courses in your wishlist.</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default WishlistedCoursesTab;
