import { Box, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef } from 'react';
import stepsEditConstants from './constants';
import { useEditLesson } from '../../../../../context/EditLessonContext';
import LessonStepHeader from './utils/LessonStepHeader';

function TextStepEdit() {
  const { selectedStep, setSelectedStep, setIsDirty } = useEditLesson();

  const handleChange = (value, editor) => {
    setSelectedStep((step) => {
      if (step.text !== value) {
        setIsDirty(true);
      }
      return { ...step, text: value };
    });
  };

  return (
    <Box>
      <LessonStepHeader>Step {selectedStep.order}: Text</LessonStepHeader>
      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        init={{
          height: 500,
          menubar: false,
          plugins: stepsEditConstants.EDITOR_PLUGINS,
          toolbar: stepsEditConstants.EDITOR_TOOLBAR,
          content_style: stepsEditConstants.EDITOR_CONTENT_STYLE,
          codesample_languages: stepsEditConstants.EDITOR_CODESAMPLE_LANGUAGES,
        }}
        value={selectedStep.text}
        onEditorChange={handleChange}
      />
    </Box>
  );
}

export default TextStepEdit;
