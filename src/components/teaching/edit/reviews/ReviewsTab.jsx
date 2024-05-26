import {
  Box,
  CircularProgress,
  Divider,
  FormControl,
  InputAdornment,
  InputBase,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReviewsSummary from './ReviewsSummary';
import SortIcon from '@mui/icons-material/Sort';
import catalogService from '../../../../features/catalog/catalogService';
import { toast } from 'react-toastify';
import ReviewsList from '../../../catalog/course-details/ReviewsList';

function ReviewsTab() {
  const { course } = useSelector((state) => state.teaching.edit);
  const [ordering, setOrdering] = useState('-creation_date');
  const [reviewsInfo, setReviewsInfo] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    course && (
      <Box sx={{ py: 2 }}>
        <Typography variant='h3' sx={{ mb: 2 }}>
          Reviews
        </Typography>
        <ReviewsSummary courseId={course.id} />
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
