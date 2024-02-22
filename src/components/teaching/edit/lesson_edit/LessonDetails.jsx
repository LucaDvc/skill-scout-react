import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLayout } from '../../../../context/LayoutContext';

function LessonDetails() {
  const { lessonId } = useParams();

  const { setShowFooter, setNavbarFixed } = useLayout();

  useEffect(() => {
    setShowFooter(false);
    setNavbarFixed(true);

    return () => {
      setShowFooter(true);
      setNavbarFixed(false);
    };
  }, []);

  return (
    <Box sx={{ marginTop: '75px' }}>
      <h1>Lesson {lessonId}</h1>
    </Box>
  );
}

export default LessonDetails;
