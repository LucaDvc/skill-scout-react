import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReviewForm from './ReviewForm';
import learningService from '../../../features/learning/learningService';
import Spinner from '../../Spinner';

function LearnerReview() {
  const [userReview, setUserReview] = useState(null);
  const { course } = useSelector((state) => state.learning);
  const reviewAllowed = course?.learner_progress.completion_ratio >= 80.0;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserReview = async () => {
      setLoading(true);
      try {
        const response = await learningService.getUserCourseReview(course.id);
        setUserReview(response);
      } catch (error) {
        if (error.response.status !== 404) {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (!!course && reviewAllowed) {
      fetchUserReview();
    }
  }, [course]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box py={2}>
      <Typography variant='h3' sx={{ mb: 2 }}>
        Course Review
      </Typography>
      {!reviewAllowed ? (
        <Typography variant='body1'>
          You need to complete at least 80% of the course to leave a review.
        </Typography>
      ) : (
        <ReviewForm userReview={userReview} courseId={course.id} />
      )}
    </Box>
  );
}

export default LearnerReview;
