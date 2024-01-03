import { Card, CardContent, Skeleton } from '@mui/material';
import React from 'react';

function LoadingSmallCard() {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 2,
        boxShadow: 3,
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <CardContent>
        <Skeleton variant='rectangular' width='80%' height={60} />
        <>
          <Skeleton height={10} width='80%' style={{ marginBottom: 6 }} />
          <Skeleton height={10} width='40%' />
          <Skeleton
            variant='rectangular'
            width='60%'
            height={20}
            style={{ margin: '20px 0' }}
          />
          <Skeleton height={10} width='80%' />
          <Skeleton height={10} width='80%' style={{ marginBottom: 6 }} />
          <Skeleton height={10} width='40%' />
        </>
      </CardContent>
    </Card>
  );
}

export default LoadingSmallCard;
