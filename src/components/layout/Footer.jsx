import { Box, Container, Typography } from '@mui/material';
import React from 'react';
import Copyright from './Copyright';
import { useLayout } from '../../context/LayoutContext';

function Footer() {
  const { showFooter } = useLayout();

  if (!showFooter) return null;

  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth='sm'>
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footer;
