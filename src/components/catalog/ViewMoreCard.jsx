import { Box, Button, Card, CardContent, Chip } from '@mui/material';
import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function ViewMoreCard({ link }) {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 2,
        boxShadow: 3,
        position: 'relative',
        overflow: 'visible',
        transition: '0.3s',
        minHeight: 220,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover': {
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
          transform: 'scale(1.05)',
        },
      }}
    >
      <CardContent>
        <Button
          endIcon={<ChevronRightIcon />}
          variant='contained'
          color='secondary'
          href={link}
          sx={{
            padding: 2,
          }}
        >
          View More
        </Button>
      </CardContent>
    </Card>
  );
}

export default ViewMoreCard;
