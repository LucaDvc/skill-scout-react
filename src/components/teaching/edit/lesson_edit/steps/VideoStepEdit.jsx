import React, { useEffect, useRef, useState } from 'react';
import { useEditLesson } from '../../../../../context/EditLessonContext';
import { Box, Button, TextField, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';
import LessonStepHeader from './utils/LessonStepHeader';
import VisuallyHiddenInput from './utils/VisuallyHiddenInput';

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

function VideoStepEdit() {
  const { selectedStep, setSelectedStep, setIsDirty, videoFiles, setVideoFiles } =
    useEditLesson();

  const [videoUrl, setVideoUrl] = useState(selectedStep.video_file || '');
  const [videoType, setVideoType] = useState(getVideoType(selectedStep.video_file || ''));

  useEffect(() => {
    setVideoUrl(selectedStep.video_file || '');
    setVideoType(
      selectedStep.fileType
        ? selectedStep.fileType
        : getVideoType(selectedStep.video_file || '')
    );
  }, [selectedStep]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const fileType = file.type;
      console.log(url, fileType);
      setSelectedStep({ ...selectedStep, video_file: url, fileType });
      setVideoFiles((videoFiles) => ({ ...videoFiles, [selectedStep.id]: file }));
      setIsDirty(true);

      event.target.value = null;
    }
  };

  const handleTitleChange = (event) => {
    setSelectedStep({ ...selectedStep, title: event.target.value });
    setIsDirty(true);
  };

  const handleRemoveVideo = () => {
    setSelectedStep({ ...selectedStep, video_file: null });
    setVideoFiles((videoFiles) => ({ ...videoFiles, [selectedStep.id]: '' }));
    setIsDirty(true);
  };

  return (
    <Box>
      <LessonStepHeader>Step {selectedStep.order}: Video</LessonStepHeader>
      {videoUrl && (
        <>
          <TextField
            label='Video Step Title'
            value={selectedStep.title}
            onChange={handleTitleChange}
            sx={{
              marginY: 2,
              width: '100%',
            }}
            InputProps={{
              inputProps: {
                maxLength: 150,
              },
            }}
            helperText='Max. 150 characters. Not required, but recommended.'
          />
          <Box
            key={videoUrl}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 2,
            }}
          >
            <MediaPlayer
              title={selectedStep.title}
              src={{ src: videoUrl, type: videoType }}
            >
              <MediaProvider />
              <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>

            {videoFiles[selectedStep.id]?.name && (
              <>
                <Typography variant='subtitle1' sx={{ marginY: 1, textAlign: 'center' }}>
                  Selected video:{' '}
                  {videoFiles[selectedStep.id]?.name ?? selectedStep.title}. You can also
                  reupload a new one.
                </Typography>
                <Typography variant='subtitle1' textAlign='center'>
                  Don't forget to save the changes before leaving!
                </Typography>
              </>
            )}

            <Button
              variant='outlined'
              size='large'
              onClick={handleRemoveVideo}
              sx={{ marginTop: 2, marginBottom: 1 }}
            >
              Remove Video
            </Button>
          </Box>
        </>
      )}
      <Button
        component='label'
        role={undefined}
        variant='contained'
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        size='large'
        sx={{ marginY: 1 }}
      >
        {videoUrl ? 'Replace' : 'Upload'} video
        <VisuallyHiddenInput
          type='file'
          accept='.MOV,.avi,.mp4,.webm,.mkv'
          onChange={handleFileChange}
        />
      </Button>

      <Typography variant='body1' color='textSecondary' component='p'>
        Upload files up to 100 MB. Supported formats: 'MOV', 'avi', 'mp4', 'webm', 'mkv'.
      </Typography>
    </Box>
  );
}

export default VideoStepEdit;
