import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect, useState } from 'react';
import stepsEditConstants from '../constants';
import { useEditLesson } from '../../../../../../context/EditLessonContext';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import TabPanel from '../utils/TabPanel';
import OptionsTab from './OptionsTab';
import ExplanationTab from './ExplanationTab';
import LessonStepHeader from '../utils/LessonStepHeader';

function QuizStepEdit() {
  const { selectedStep, setSelectedStep, saveStep, setIsDirty, savePressed } =
    useEditLesson();

  const [selectedTab, setSelectedTab] = useState(0);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleQuestionChange = (value, editor) => {
    setSelectedStep((step) => {
      if (step.question !== value) {
        setIsDirty(true);
      }
      return { ...step, question: value };
    });
  };

  const handleRadioButtonsInputChange = () => {
    setSelectedStep((step) => {
      const firstCheckedIndex = step.quiz_choices.findIndex((o) => o.correct);
      const options = step.quiz_choices.map((o, index) => {
        return { ...o, correct: index === firstCheckedIndex };
      });
      return { ...step, multiple_choice: false, quiz_choices: options };
    });
    setIsDirty(true);
  };

  const handleCheckboxesInputChange = () => {
    setSelectedStep((step) => ({ ...step, multiple_choice: true }));
    setIsDirty(true);
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
      <LessonStepHeader>Step {selectedStep.order}: Multiple Choice Quiz</LessonStepHeader>
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
        value={selectedStep.question}
        onEditorChange={handleQuestionChange}
      />

      <Typography variant='subtitle1' gutterBottom sx={{ marginTop: 3 }}>
        Settings
      </Typography>
      <Typography variant='body2' gutterBottom>
        Input type:
      </Typography>
      <ButtonGroup
        variant='outlined'
        aria-label='Basic button group'
        size='medium'
        sx={{ marginBottom: 2 }}
      >
        <Button
          startIcon={<RadioButtonCheckedIcon />}
          onClick={handleRadioButtonsInputChange}
          sx={{
            backgroundColor: selectedStep.multiple_choice ? 'transparent' : 'lightgray',
          }}
        >
          Radio buttons
        </Button>
        <Button
          startIcon={<CheckBoxIcon />}
          onClick={handleCheckboxesInputChange}
          sx={{
            backgroundColor: !selectedStep.multiple_choice ? 'transparent' : 'lightgray',
          }}
        >
          Checkboxes
        </Button>
      </ButtonGroup>

      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        indicatorColor='secondary'
        textColor='secondary'
        aria-label='multiple choice quiz settings tabs'
      >
        <Tab label='Options' />
        <Tab label='Explanation' />
      </Tabs>
      <Divider />
      <TabPanel value={selectedTab} index={0}>
        <OptionsTab />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <ExplanationTab />
      </TabPanel>
    </Box>
  );
}

export default QuizStepEdit;
