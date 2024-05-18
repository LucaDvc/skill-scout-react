import { Typography } from '@mui/material';
import React from 'react';
import { useEditLesson } from '../../../../../../context/EditLessonContext';
import { Editor } from '@tinymce/tinymce-react';
import stepsEditConstants from '../constants';

function ExplanationTab() {
  const { selectedStep, setSelectedStep, setIsDirty } = useEditLesson();

  const handleExplanationChange = (value, editor) => {
    setSelectedStep((step) => {
      if (step.explanation !== value) {
        setIsDirty(true);
      }
      return { ...step, explanation: value };
    });
  };

  return (
    <>
      <Typography variant='body2' gutterBottom>
        Will be shown if a learner answers correctly.
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
        value={selectedStep.explanation}
        onEditorChange={handleExplanationChange}
      />
    </>
  );
}

export default ExplanationTab;
