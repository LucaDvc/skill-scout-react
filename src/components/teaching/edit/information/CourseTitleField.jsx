import { TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

function CourseTitleField({ title, onChange, name, marginTop }) {
  const [error, setError] = useState('');
  const [value, setValue] = useState(title);

  useEffect(() => {
    setValue(title);
  }, [title]);

  const handleChange = (event) => {
    setValue(event.target.value);
    if (event.target.value.length < 5) {
      setError('Title must be at least 5 characters long');
    } else if (event.target.value.length > 100) {
      setError('Max. 100 characters long');
    } else {
      setError('');
      onChange(event);
    }
  };

  return (
    <TextField
      sx={{ marginTop: marginTop }}
      value={value}
      name={name}
      onChange={handleChange}
      fullWidth
      error={error !== ''}
      helperText={error}
      label='Title'
      variant='outlined'
    />
  );
}

export default CourseTitleField;
