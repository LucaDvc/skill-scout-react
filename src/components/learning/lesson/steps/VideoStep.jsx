import { Box, Container, Typography } from '@mui/material';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  DefaultVideoLayout,
  defaultLayoutIcons,
} from '@vidstack/react/player/layouts/default';
import { useDispatch } from 'react-redux';
import { completeLessonStep } from '../../../../features/learning/learningSlice';
import React, { useEffect } from 'react';

const getVideoType = (url) => {
  const extension = url.split('.').pop().toLowerCase();
  switch (extension) {
    case 'mp4':
      return 'video/mp4';
    case 'mov':
      return 'video/quicktime';
    case 'avi':
      return 'video/x-msvideo';
    case 'webm':
      return 'video/webm';
    case 'mkv':
      return 'video/x-matroska';
    default:
      return '';
  }
};

function VideoStep({ step }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!step.completed) {
      dispatch(completeLessonStep(step.id));
    }
  }, [dispatch, step]);

  return (
    <Container maxWidth='md'>
      <Typography variant='h4' gutterBottom>
        {step.title}
      </Typography>
      <MediaPlayer
        title={step.title}
        src={{ src: step.video_file, type: getVideoType(step.video_file || '') }}
      >
        <MediaProvider />
        <DefaultVideoLayout icons={defaultLayoutIcons} />
      </MediaPlayer>
    </Container>
  );
}

export default VideoStep;
