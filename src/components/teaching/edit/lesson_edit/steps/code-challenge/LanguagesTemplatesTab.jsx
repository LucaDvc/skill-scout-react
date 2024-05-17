import React, { useEffect, useState } from 'react';
import { useEditLesson } from '../../../../../../context/EditLessonContext';
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import globalConstants from '../../../../../../utils/globalConstants';
import AceEditor from 'react-ace';
import HtmlContent from '../../../../../HtmlContent';
import stepsEditConstants from '../constants';

function LanguagesTemplatesTab() {
  const {
    selectedStep: codeChallenge,
    setSelectedStep: setCodeChallenge,
    saveStep,
    setIsDirty,
  } = useEditLesson();

  const [language, setLanguage] = useState(
    globalConstants.programmingLanguages.find(
      (l) => l.id === codeChallenge.language_id
    ) || null
  );

  useEffect(() => {
    setCodeChallenge({ ...codeChallenge, language_id: language?.id });
  }, [language]);

  const handleCodeChange = (newCode) => {
    setCodeChallenge({ ...codeChallenge, initial_code: btoa(newCode) });
    setIsDirty(true);
  };

  return (
    <>
      <Typography variant='body1' color='textSecondary' component='p' gutterBottom>
        Select the desired programming language and write the initial code for the code
        challenge.
      </Typography>
      <Autocomplete
        disablePortal
        id='language-select'
        options={globalConstants.programmingLanguages}
        getOptionLabel={(option) => option.name}
        value={language}
        onChange={(event, newValue) => {
          setLanguage(newValue);
        }}
        sx={{ width: 300, marginY: 2 }}
        renderInput={(params) => <TextField {...params} required label='Language' />}
      />
      <Typography variant='body1' color='textSecondary' component='p' gutterBottom>
        Write the initial code for the code challenge. Use the language's standard input
        for capturing the test cases inputs and the standard output for getting the
        result.
      </Typography>

      <Typography variant='body1' color='textSecondary' component='p' gutterBottom>
        Example:
      </Typography>

      <Box
        sx={{
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: 'grey.300',
          marginBottom: 4,
          width: '75%',
        }}
      >
        <AceEditor
          readOnly={true}
          mode={'python'}
          theme='xcode'
          value={stepsEditConstants.CODE_CHALLENGE_TEMPLATE_EXAMPLE}
          fontSize={16}
          width='100%'
          height='265px'
          setOptions={{
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
      </Box>

      <Typography variant='subtitle1' gutterBottom>
        Template Code
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
          placeholder='Write the initial code for the code challenge here...'
          theme='tomorrow'
          name='initial-code-editor'
          onChange={handleCodeChange}
          value={codeChallenge.initial_code ? atob(codeChallenge.initial_code) : ''}
          fontSize={16}
          width='100%'
          height='300px'
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 4,
          }}
        />
      </Box>
    </>
  );
}

export default LanguagesTemplatesTab;
