import { Box, TextField, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useState } from 'react';
import stepsEditConstants from '../constants';
import { useEditLesson } from '../../../../../../context/EditLessonContext';
import LessonStepHeader from '../utils/LessonStepHeader';
import OptionsList from './OptionsList';

function SortingProblemEdit() {
  const { selectedStep, setSelectedStep, saveStep, setIsDirty, savePressed } =
    useEditLesson();

  const handleTitleChange = (event) => {
    setSelectedStep({ ...selectedStep, title: event.target.value });
    setIsDirty(true);
  };

  const handleStatementChange = (value, editor) => {
    setSelectedStep((step) => {
      if (step.statement !== value) {
        setIsDirty(true);
      }
      return { ...step, statement: value };
    });
  };

  useEffect(() => {
    saveStep(selectedStep);
  }, [savePressed]);

  useEffect(() => {
    return () => {
      saveStep(selectedStep);
    };
  }, [selectedStep, saveStep]);

  return (
    <Box>
      <LessonStepHeader>Step {selectedStep.order}: Sorting Problem</LessonStepHeader>
      <TextField
        label='Problem Title'
        value={selectedStep.title}
        onChange={handleTitleChange}
        sx={{
          marginY: 2,
          width: '100%',
        }}
        required
        InputProps={{
          inputProps: {
            maxLength: 100,
          },
        }}
        helperText='Max. 100 characters'
      />
      <Typography variant='subtitle1' gutterBottom sx={{ marginTop: 1 }}>
        Statement
      </Typography>
      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        init={{
          height: 300,
          menubar: false,
          plugins: stepsEditConstants.EDITOR_PLUGINS,
          toolbar: stepsEditConstants.EDITOR_TOOLBAR,
          content_style: stepsEditConstants.EDITOR_CONTENT_STYLE,
          codesample_languages: stepsEditConstants.EDITOR_CODESAMPLE_LANGUAGES,
        }}
        value={selectedStep.statement}
        onEditorChange={handleStatementChange}
      />

      <Typography variant='subtitle1' gutterBottom sx={{ marginTop: 3 }}>
        Settings
      </Typography>
      <Typography variant='subtitle2' gutterBottom color='text.secondary'>
        Please specify items below. Learners will need to put them in the same order.
      </Typography>
      <OptionsList />
    </Box>
  );
}

export default SortingProblemEdit;
