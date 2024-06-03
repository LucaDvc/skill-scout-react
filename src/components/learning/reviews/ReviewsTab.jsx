import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  InputAdornment,
  InputBase,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SortIcon from '@mui/icons-material/Sort';
import { toast } from 'react-toastify';
import ReviewsSummary from '../../teaching/edit/reviews/ReviewsSummary';
import catalogService from '../../../features/catalog/catalogService';
import ReviewsList from '../../catalog/course-details/ReviewsList';
import learningService from '../../../features/learning/learningService';
import { useNavigate } from 'react-router-dom';

function ReviewsTab() {
  const { course } = useSelector((state) => state.learning);
  const [ordering, setOrdering] = useState('-creation_date');
  const [reviewsInfo, setReviewsInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userReview, setUserReview] = useState(null);

  const navigate = useNavigate();

  const reviewAllowed = course?.learner_progress.completion_ratio >= 80.0;

  const handleSortingChange = (event) => {
    setOrdering(event.target.value);
  };

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      try {
        const response = await catalogService.getCourseReviews(course.id, {
          ordering,
        });
        setReviewsInfo(response);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch reviews. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (!!course) {
      fetchReviews();
    }
  }, [course, ordering]);

  useEffect(() => {
    const fetchUserReview = async () => {
      try {
        const response = await learningService.getUserCourseReview(course.id);
        setUserReview(response);
      } catch (error) {
        if (error.response.status !== 404) {
          console.error(error);
        }
      }
    };

    if (!!course) {
      fetchUserReview();
    }
  }, [course]);

  return (
    course && (
      <Box sx={{ py: 2 }}>
        <Typography variant='h3' sx={{ mb: 2 }}>
          Reviews
        </Typography>
        <ReviewsSummary courseId={course.id} />
        <Box sx={{ my: 1, display: 'flex', alignItems: 'center' }}>
          <Button
            variant='contained'
            color='secondary'
            disabled={!reviewAllowed}
            sx={{ borderRadius: 0.5 }}
            onClick={() => navigate(`/learning/courses/${course.id}/review`)}
          >
            {userReview ? 'Edit review' : 'Send review'}
          </Button>
          <Typography variant='body2' sx={{ ml: 2 }}>
            {!reviewAllowed &&
              'You need to complete at least 80% of the course to leave a review.'}
          </Typography>
        </Box>
        {loading ? (
          <CircularProgress sx={{ mt: 2 }} />
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
              }}
            >
              <Typography variant='h5' mt={1}>
                {reviewsInfo.reviews?.length}{' '}
                {reviewsInfo.reviews?.length > 1 ? 'reviews' : 'review'}
              </Typography>
              <FormControl size='small' sx={{ minWidth: 100 }} variant='standard'>
                <Select
                  id='sorting-select'
                  value={ordering}
                  onChange={handleSortingChange}
                  input={
                    <InputBase
                      startAdornment={
                        <InputAdornment position='start'>
                          <SortIcon />
                        </InputAdornment>
                      }
                    />
                  }
                >
                  <MenuItem value='-creation_date'>Newest</MenuItem>
                  <MenuItem value='-rating'>Positive</MenuItem>
                  <MenuItem value='rating'>Negative</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Divider />
            <ReviewsList reviews={reviewsInfo.reviews} visibleReviewsNumber={7} />
          </>
        )}
      </Box>
    )
  );
}

export default ReviewsTab;
