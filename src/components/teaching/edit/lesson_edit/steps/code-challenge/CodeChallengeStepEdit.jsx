import { Box, Button, Divider, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import React, { useState } from 'react';
import stepsEditConstants from '../constants';
import { useEditLesson } from '../../../../../../context/EditLessonContext';
import TestCasesTab from './TestCasesTab';
import LanguagesTemplatesTab from './LanguagesTemplatesTab';
import TabPanel from '../utils/TabPanel';
import LessonStepHeader from '../utils/LessonStepHeader';

function CodeChallengeStepEdit() {
  const { selectedStep, setSelectedStep, setIsDirty } = useEditLesson();

  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleDescriptionChange = (value, editor) => {
    setSelectedStep((step) => {
      if (step.description !== value) {
        setIsDirty(true);
      }
      return { ...step, description: value };
    });
  };

  const handleTitleChange = (event) => {
    const title = event.target.value;
    setSelectedStep((step) => {
      if (step.title !== title) {
        setIsDirty(true);
      }
      return { ...step, title };
    });
  };

  const handleProposedSolutionChange = (value, editor) => {
    setSelectedStep((step) => {
      if (step.proposed_solution !== value) {
        setIsDirty(true);
      }
      return { ...step, proposed_solution: value };
    });
  };

  return (
    <Box>
      <LessonStepHeader>Step {selectedStep.order}: Code Challenge</LessonStepHeader>

      <TextField
        label='Code Challenge Title'
        value={selectedStep.title}
        onChange={handleTitleChange}
        required
        sx={{
          marginY: 2,
          width: '100%',
        }}
        InputProps={{
          inputProps: {
            maxLength: 100,
          },
        }}
        helperText='Max. 100 characters'
      />

      <Typography variant='subtitle1' gutterBottom>
        Statement
      </Typography>
      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        init={{
          min_height: 350,
          resize: true,
          menubar: false,
          plugins: stepsEditConstants.EDITOR_PLUGINS,
          toolbar: stepsEditConstants.EDITOR_TOOLBAR,
          content_style: stepsEditConstants.EDITOR_CONTENT_STYLE,
          codesample_languages: stepsEditConstants.EDITOR_CODESAMPLE_LANGUAGES,
        }}
        value={selectedStep.description}
        onEditorChange={handleDescriptionChange}
      />

      <Typography variant='subtitle1' sx={{ mt: 2 }} gutterBottom>
        Settings
      </Typography>

      <Box>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor='secondary'
          textColor='secondary'
          aria-label='code challenge settings tabs'
        >
          <Tab label='Test cases' />
          <Tab label='Language & Template' />
          <Tab label='Proposed solution' />
        </Tabs>
        <Divider />

        <TabPanel value={selectedTab} index={0}>
          <TestCasesTab />
        </TabPanel>
        <TabPanel value={selectedTab} index={1}>
          <LanguagesTemplatesTab />
        </TabPanel>
        <TabPanel value={selectedTab} index={2}>
          <Editor
            apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
            init={{
              min_height: 350,
              resize: true,
              menubar: false,
              plugins: stepsEditConstants.EDITOR_PLUGINS,
              toolbar: stepsEditConstants.EDITOR_TOOLBAR,
              content_style: stepsEditConstants.EDITOR_CONTENT_STYLE,
              codesample_languages: stepsEditConstants.EDITOR_CODESAMPLE_LANGUAGES,
            }}
            initialValue={stepsEditConstants.CODE_CHALLENGE_PROPOSED_SOLUTION_PLACEHOLDER}
            value={selectedStep.proposed_solution}
            onEditorChange={handleProposedSolutionChange}
          />
        </TabPanel>
      </Box>
    </Box>
  );
}

export default CodeChallengeStepEdit;
