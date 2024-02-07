import { TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

function CourseTitleField({ title }) {
  const [error, setError] = useState('');
  const [value, setValue] = useState(title);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value.length < 5) {
      setError('Title must be at least 5 characters long');
    } else if (event.target.value.length > 100) {
      setError('Max. 100 characters long');
    } else {
      setError('');
    }
  };

  return (
    <TextField
      sx={{ marginTop: 4 }}
      value={value}
      onChange={handleChange}
      fullWidth
      error={error !== ''}
      helperText={error}
      focused
      label={<Typography variant='h5'>Title</Typography>}
      variant='outlined'
    />
  );
}

export default CourseTitleField;
