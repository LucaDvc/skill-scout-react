import React from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {'Copyright © '}
      <Link to='/catalog' style={{ color: 'inherit' }}>
        Skill Scout
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default Copyright;
