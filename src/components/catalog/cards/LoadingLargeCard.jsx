import {
  Avatar,
  Box,
  Card,
  CardContent,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';

function LoadingLargeCard() {
  return (
    <Card
      sx={{
        maxWidth: '100%',
        borderRadius: 2,
        boxShadow: 3,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ margin: 1 }}>
              <Skeleton variant='rounded' sx={{ width: 112, height: 112 }} />
            </Box>
            <Stack spacing={1} sx={{ width: 200, mt: 1, ml: 1 }}>
              <Skeleton variant='text' width='80%' />
              <Skeleton variant='text' width='100%' />
              <Skeleton variant='text' width='60%' />
              <Skeleton variant='text' width='70%' />
            </Stack>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              mt: 1,
            }}
          >
            <Skeleton variant='rounded' width={60} height={25} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default LoadingLargeCard;
