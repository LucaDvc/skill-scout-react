import { Box, Button, Divider, Rating, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';

function ReviewsList({ reviews, visibleReviewsNumber }) {
  const [visibleReviews, setVisibleReviews] = useState(visibleReviewsNumber || 5); // Number of reviews to show initially

  const loadMore = () => {
    setVisibleReviews((prevVisibleReviews) =>
      visibleReviewsNumber
        ? prevVisibleReviews + visibleReviewsNumber
        : prevVisibleReviews + 5
    ); // Load more reviews
  };

  return (
    <Stack spacing={2} mt={2} divider={<Divider sx={{ borderColor: 'lightgray' }} />}>
      {reviews?.length === 0 ? (
        <Typography variant='subtitle1'>No reviews yet</Typography>
      ) : (
        reviews?.slice(0, visibleReviews).map((review) => (
          <Box key={review.id} sx={{ maxWidth: 'sm' }}>
            <Rating value={review.rating} readOnly size='small' sx={{ mb: 1 }} />
            <Typography variant='body2' gutterBottom>
              {review.comment}
            </Typography>
            <Link to={`/users/${review.learner.id}`} className='link-no-style'>
              <Typography variant='body2' component='span'>
                {review.learner.first_name + ' ' + review.learner.last_name}
              </Typography>
            </Link>
            <Typography variant='caption' ml={2}>
              {`${formatDistanceToNow(parseISO(review.creation_date))} ago`}
            </Typography>
          </Box>
        ))
      )}
      {visibleReviews < reviews?.length && ( // Show the button only if there are more reviews to show
        <Button
          variant='text'
          startIcon={<ExpandMoreIcon />}
          onClick={loadMore}
          sx={{
            '&:hover': {
              backgroundColor: 'inherit',
            },
          }}
        >
          Show More
        </Button>
      )}
    </Stack>
  );
}

export default ReviewsList;
