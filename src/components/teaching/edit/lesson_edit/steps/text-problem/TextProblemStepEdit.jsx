import {
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import React from 'react';
import stepsEditConstants from '../constants';
import { useEditLesson } from '../../../../../../context/EditLessonContext';
import LessonStepHeader from '../utils/LessonStepHeader';

function TextProblemStepEdit() {
  const { selectedStep, setSelectedStep, setIsDirty } = useEditLesson();

  const handleStatementChange = (value, editor) => {
    setSelectedStep((step) => {
      if (step.statement !== value) {
        setIsDirty(true);
      }
      return { ...step, statement: value };
    });
  };

  const handleTitleChange = (event) => {
    setSelectedStep({ ...selectedStep, title: event.target.value });
    setIsDirty(true);
  };

  const handleAnswerChange = (event) => {
    setSelectedStep({ ...selectedStep, correct_answer: event.target.value });
    setIsDirty(true);
  };

  const handleCaseSensitiveChange = (event) => {
    setSelectedStep({ ...selectedStep, case_sensitive: event.target.checked });
    setIsDirty(true);
  };

  const handleAllowRegexChange = (event) => {
    setSelectedStep({ ...selectedStep, allow_regex: event.target.checked });
    setIsDirty(true);
  };

  return (
    <Box>
      <LessonStepHeader>Step {selectedStep.order}: Text Problem</LessonStepHeader>
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

      <TextField
        label='Correct answer'
        value={selectedStep.correct_answer}
        onChange={handleAnswerChange}
        fullWidth
        required
        multiline
        minRows={2}
        sx={{ mt: 1 }}
      />

      <Card
        sx={{
          borderRadius: 1,
          boxShadow: 0.5,
          borderWidth: 0.1,
          borderColor: 'grey.300',
          borderStyle: 'solid',
          marginY: 2,
        }}
      >
        <CardContent>
          <Typography variant='h6' gutterBottom>
            Matching options
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedStep.case_sensitive}
                onChange={handleCaseSensitiveChange}
              />
            }
            label='Case sensitive'
            sx={{ display: 'block' }}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedStep.allow_regex}
                onChange={handleAllowRegexChange}
              />
            }
            label={
              <>
                Allow{' '}
                <Link href='https://docs.python.org/3/howto/regex.html' color='#1F60D3'>
                  regular expressions
                </Link>
              </>
            }
          />
        </CardContent>
      </Card>
    </Box>
  );
}

export default TextProblemStepEdit;
