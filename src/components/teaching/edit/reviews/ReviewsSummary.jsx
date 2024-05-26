import React, { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import { Box, LinearProgress, Rating, Skeleton, Typography } from '@mui/material';
import catalogService from '../../../../features/catalog/catalogService';
import { toast } from 'react-toastify';

function ReviewsSummary({ courseId }) {
  const [reviewsInfo, setReviewsInfo] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await catalogService.getCourseReviews(courseId);
        setReviewsInfo(response);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch reviews. Please try again.');
      }
    };
    if (courseId) {
      fetchReviews();
    }
  }, [courseId]);

  if (!reviewsInfo) {
    // Skeleton view while loading
    return (
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: -0.5 }}>
            <Skeleton variant='text' width={32} height={48} />
            <StarIcon sx={{ color: 'rgb(255, 206, 110)' }} />
          </Box>
          <Typography variant='caption'>of 5</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <Box
              key={rating}
              sx={{
                display: 'flex',
                alignItems: 'center',
                mb: -0.4,
                ml: `${index * 12}px`,
              }}
            >
              <Rating
                name='size-small'
                defaultValue={rating}
                size='small'
                readOnly
                icon={<StarIcon sx={{ fontSize: 12, color: 'GrayText' }} />}
                max={rating}
              />
              <Skeleton
                variant='rectangular'
                width={112}
                height={2}
                sx={{ borderRadius: 1, mx: 1 }}
              />
              <Skeleton variant='text' width={16} height={16} />
            </Box>
          ))}
          <Skeleton variant='text' width={100} height={16} sx={{ alignSelf: 'center' }} />
        </Box>
      </Box>
    );
  }

  return (
    reviewsInfo && (
      <Box sx={{ display: 'flex', gap: 1, alignItem: 'baseline' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', my: -1 }}>
            <Typography fontSize={42} fontWeight={600}>
              {reviewsInfo.avg_rating}
            </Typography>
            <StarIcon sx={{ color: 'rgb(255, 206, 110)' }} />
          </Box>
          <Typography variant='caption'>of 5</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: -0.4 }}>
            <Rating
              name='size-small'
              defaultValue={5}
              size='small'
              icon={<StarIcon sx={{ fontSize: 12, color: 'GrayText' }} />}
              readOnly
            />
            <LinearProgress
              variant='determinate'
              value={reviewsInfo.percentage_five_star}
              sx={{ width: 112, borderRadius: 1, height: 0.15 }}
            />
            <Typography variant='caption'>{reviewsInfo.percentage_five_star}%</Typography>
          </Box>

          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: -0.4, ml: '12px' }}
          >
            <Rating
              name='size-small'
              defaultValue={4}
              size='small'
              icon={<StarIcon sx={{ fontSize: 12, color: 'GrayText' }} />}
              max={4}
              readOnly
            />
            <LinearProgress
              variant='determinate'
              value={reviewsInfo.percentage_four_star}
              sx={{ width: 112, borderRadius: 1, height: 0.15 }}
            />
            <Typography variant='caption'>{reviewsInfo.percentage_four_star}%</Typography>
          </Box>

          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: -0.4, ml: '24px' }}
          >
            <Rating
              name='size-small'
              defaultValue={3}
              size='small'
              icon={<StarIcon sx={{ fontSize: 12, color: 'GrayText' }} />}
              max={3}
              readOnly
            />
            <LinearProgress
              variant='determinate'
              value={reviewsInfo.percentage_three_star}
              sx={{ width: 112, borderRadius: 1, height: 0.15 }}
            />
            <Typography variant='caption'>
              {reviewsInfo.percentage_three_star}%
            </Typography>
          </Box>

          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: -0.4, ml: '36px' }}
          >
            <Rating
              name='size-small'
              defaultValue={2}
              size='small'
              icon={<StarIcon sx={{ fontSize: 12, color: 'GrayText' }} />}
              max={2}
              readOnly
            />
            <LinearProgress
              variant='determinate'
              value={reviewsInfo.percentage_two_star}
              sx={{ width: 112, borderRadius: 1, height: 0.15 }}
            />
            <Typography variant='caption'>{reviewsInfo.percentage_two_star}%</Typography>
          </Box>

          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: -0.4, ml: '48px' }}
          >
            <Rating
              name='size-small'
              defaultValue={1}
              size='small'
              icon={<StarIcon sx={{ fontSize: 12, color: 'GrayText' }} />}
              max={1}
              readOnly
            />
            <LinearProgress
              variant='determinate'
              value={reviewsInfo.percentage_one_star}
              sx={{ width: 112, borderRadius: 1, height: 0.15 }}
            />
            <Typography variant='caption'>{reviewsInfo.percentage_one_star}%</Typography>
          </Box>

          <Typography variant='caption' alignSelf='center'>
            of {reviewsInfo.reviews?.length} reviews
          </Typography>
        </Box>
      </Box>
    )
  );
}

export default ReviewsSummary;
