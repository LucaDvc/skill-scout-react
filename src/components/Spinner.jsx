import { Backdrop, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { useLayout } from '../context/LayoutContext';

function Spinner({ showNavbar = true, showFooter = false }) {
  const { setShowNavbar, setShowFooter } = useLayout();
  useEffect(() => {
    setShowNavbar(showNavbar);
    setShowFooter(showFooter);

    // Show Navbar and Footer when the component unmounts
    return () => {
      setShowNavbar(true);
      setShowFooter(true);
    };
  }, [setShowNavbar, setShowFooter, showNavbar, showFooter]);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress color='inherit' />
    </Backdrop>
  );
}

export default Spinner;
