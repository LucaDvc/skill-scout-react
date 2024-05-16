import { Box, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useRef } from 'react';
import stepsEditConstants from './constants';
import { useEditLesson } from '../../../../../context/EditLessonContext';

function TextStepEdit() {
  const { selectedStep, setSelectedStep, saveStep } = useEditLesson();

  const editorRef = useRef(null);

  const handleChange = (value, editor) => {
    setSelectedStep({ ...selectedStep, text: value });
  };

  useEffect(() => {
    return () => {
      saveStep(selectedStep);
    };
  }, [selectedStep, saveStep]);

  return (
    <Box>
      <Typography variant='h6' gutterBottom>
        Step {selectedStep.order}: Text
      </Typography>
      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
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
