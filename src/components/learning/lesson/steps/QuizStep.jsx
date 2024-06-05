import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import React from 'react';
import HtmlContent from '../../../HtmlContent';

function QuizStep({ step }) {
  const [selectedChoices, setSelectedChoices] = React.useState(
    step.quiz_choices.reduce((acc, choice) => {
      acc[choice.id] = false;
      return acc;
    }, {})
  );

  const handleChange = (event) => {
    if (step.multiple_choice) {
      setSelectedChoices({
        ...selectedChoices,
        [event.target.id]: event.target.checked,
      });
    } else {
      // uncheck all other choices and check/uncheck the selected choice
      setSelectedChoices(
        Object.keys(selectedChoices).reduce((acc, choiceId) => {
          acc[choiceId] = choiceId === event.target.id ? event.target.checked : false;
          return acc;
        }, {})
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedChoiceIds = Object.keys(selectedChoices).filter(
      (choiceId) => selectedChoices[choiceId]
    );
    console.log('Selected choices:', selectedChoiceIds);
    // submit quiz answers to the server
    // check if the backend takes care of the assessment analytics update
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <HtmlContent html={step.question} />
      <Box mt={4}>
        <Typography variant='h6' gutterBottom>
          {step.multiple_choice
            ? 'Select all correct options from the list:'
            : 'Select the correct option from the list:'}
        </Typography>
        <FormGroup>
          {step.quiz_choices.map((choice) => (
            <FormControlLabel
              key={choice.id}
              control={
                <Checkbox
                  checked={selectedChoices[choice.id]}
                  onChange={handleChange}
                  id={choice.id}
                />
              }
              label={choice.text}
              sx={{ display: 'inline' }}
            />
          ))}
        </FormGroup>
        <Button type='submit' variant='contained' color='primary' sx={{ marginTop: 2 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default QuizStep;
