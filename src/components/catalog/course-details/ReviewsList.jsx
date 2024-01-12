import { Box, Button, Rating, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function ReviewsList({ reviews }) {
  const [visibleReviews, setVisibleReviews] = useState(5); // Number of reviews to show initially

  const loadMore = () => {
    setVisibleReviews((prevVisibleReviews) => prevVisibleReviews + 5); // Load 5 more reviews
  };

  return (
    <Stack spacing={2} mt={2}>
      {reviews?.slice(0, visibleReviews).map((review) => (
        <Box key={review.id}>
          <Rating value={review.rating} readOnly size='small' />
          <Typography variant='body1'>{review.comment}</Typography>
          <Typography variant='body2' component='span'>
            {review.learner.first_name + ' ' + review.learner.last_name}
          </Typography>
          <Typography variant='caption' ml={2}>
            {`${formatDistanceToNow(parseISO(review.creation_date))} ago`}
          </Typography>
        </Box>
      ))}
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
