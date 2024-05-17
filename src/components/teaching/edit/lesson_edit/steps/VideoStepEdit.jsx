import React, { useEffect, useState } from 'react';
import { useEditLesson } from '../../../../../context/EditLessonContext';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from '@vidstack/react/player/layouts/default';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

function VideoStepEdit() {
  const {
    selectedStep,
    setSelectedStep,
    saveStep,
    setIsDirty,
    videoFiles,
    setVideoFiles,
    savePressed,
  } = useEditLesson();

  const [videoUrl, setVideoUrl] = useState(selectedStep.video_file || '');

  useEffect(() => {
    saveStep(selectedStep);
  }, [savePressed]);

  useEffect(() => {
    return () => {
      saveStep(selectedStep);
    };
  }, [selectedStep, saveStep]);

  useEffect(() => {
    setVideoUrl(selectedStep.video_file || '');
  }, [selectedStep]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedStep({ ...selectedStep, video_file: url });
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
      <Typography variant='h6' gutterBottom>
        Step {selectedStep.order}: Video
      </Typography>
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
            <MediaPlayer title={selectedStep.title} src={videoUrl}>
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
