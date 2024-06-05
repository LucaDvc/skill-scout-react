import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import HtmlContent from '../../../HtmlContent';

function TextProblemStep({ step }) {
  const [answer, setAnswer] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the answer to the backend
    console.log(answer);
  };
  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Typography variant='h4' gutterBottom>
        {step.title}
      </Typography>

      <HtmlContent html={step.statement} />

      <Typography variant='h6' gutterBottom sx={{ mt: 4 }}>
        Write text answer
      </Typography>

      <TextField
        value={answer}
        onChange={(event) => setAnswer(event.target.value)}
        id='text-answer'
        label='Answer'
        required
        multiline
        fullWidth
        variant='outlined'
        placeholder='Write your answer here...'
        sx={{ my: 2 }}
        minRows={2}
      />

      <Button type='submit' variant='contained' color='primary'>
        Submit
      </Button>
    </Box>
  );
}

export default TextProblemStep;
