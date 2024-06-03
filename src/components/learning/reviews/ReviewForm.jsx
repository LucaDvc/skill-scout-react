import { Box, Button, Rating, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import learningService from '../../../features/learning/learningService';
import { useNavigate } from 'react-router-dom';

function ReviewForm({ userReview, courseId }) {
  const [formData, setFormData] = useState({
    rating: userReview?.rating || 0,
    comment: userReview?.comment || '',
  });
  const { rating, comment } = formData;

  const navigate = useNavigate();

  const handleRatingChange = (event, newValue) => {
    setFormData({ ...formData, rating: newValue });
  };

  const handleCommentChange = (event) => {
    setFormData({ ...formData, comment: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rating === 0) {
      toast.error('Please select a rating.');
      return;
    }

    if (userReview) {
      try {
        const response = learningService.updateReview(userReview.id, formData);
        if (response) {
          toast.success('Review updated successfully.');
          setTimeout(() => {
            navigate('../reviews', { replace: true });
          }, 750);
        }
      } catch (error) {
        toast.error(error.response.data.detail);
        toast.error('Failed to update review. Please try again.');
      }
    } else {
      try {
        const response = learningService.postReview(courseId, formData);
        if (response) {
          toast.success('Review submitted successfully.');
          setTimeout(() => {
            navigate('../reviews', { replace: true });
          }, 750);
        }
      } catch (error) {
        toast.error(error.response.data.detail);
        toast.error('Failed to submit review. Please try again.');
      }
    }
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      {/* Rating */}
      <Typography variant='body1' sx={{ ml: 1 }} fontSize={17}>
        Rating
      </Typography>
      <Rating value={rating} onChange={handleRatingChange} size='large' sx={{ mb: 2 }} />

      {/* Comment */}
      <TextField
        multiline
        minRows={3}
        fullWidth
        value={comment}
        onChange={handleCommentChange}
        placeholder='Write your review here...'
        label='Comment'
        sx={{ mb: 2, maxWidth: 'sm', display: 'block' }}
      />

      {/* Submit button */}
      <Button type='submit' variant='contained' color='primary'>
        Submit
      </Button>
    </Box>
  );
}

export default ReviewForm;
