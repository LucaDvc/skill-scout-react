import { Box, Button, Divider, Typography } from '@mui/material';
import React, { useState } from 'react';
import HtmlContent from '../../../HtmlContent';
import globalConstants from '../../../../utils/globalConstants';
import AceEditor from 'react-ace';

function CodeChallengeStep({ step }) {
  const language = globalConstants.programmingLanguages.find(
    (l) => l.id === step.language_id
  );

  const [code, setCode] = useState(step.initial_code ? atob(step.initial_code) : '');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the code to the backend
  };

  const handleRunCode = () => {
    // Submit code directly to judge0
  };

  return (
    <Box component='form' onSubmit={handleSubmit}>
      <Typography variant='h4' gutterBottom>
        {step.title}
      </Typography>
      <HtmlContent html={step.description} />

      <Divider sx={{ marginY: 1, borderColor: 'lightgray' }} />

      <Typography variant='subtitle1' gutterBottom>
        Sample input:
      </Typography>
      <Typography variant='body1' gutterBottom>
        {atob(step.test_cases[0].input)}
      </Typography>

      <Divider sx={{ marginY: 1, borderColor: 'lightgray' }} />

      <Typography variant='subtitle1' gutterBottom>
        Sample output:
      </Typography>
      <Typography variant='body1' sx={{ mb: 4 }}>
        {atob(step.test_cases[0].expected_output)}
      </Typography>

      <Typography variant='body1' color='textSecondary' component='p' gutterBottom>
        {language.name}
      </Typography>
      <Box
        sx={{
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'grey.300',
        }}
      >
        <AceEditor
          mode={language ? language.aceMode : 'plain_text'}
          theme='tomorrow'
          name='code-editor'
          onChange={handleCodeChange}
          value={code}
          fontSize={16}
          width='100%'
          height='350px'
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
      </Box>

      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Button variant='contained' color='primary' onClick={handleRunCode}>
          Run Code
        </Button>
        <Button variant='contained' color='secondary' type='submit'>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default CodeChallengeStep;
