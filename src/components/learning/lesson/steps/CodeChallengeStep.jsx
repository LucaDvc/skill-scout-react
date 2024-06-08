import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import HtmlContent from '../../../HtmlContent';
import globalConstants from '../../../../utils/globalConstants';
import AceEditor from 'react-ace';
import { useCodeChallenge } from '../../../../hooks/useCodeChallenge';
import CancelIcon from '@mui/icons-material/Cancel';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { LoadingButton } from '@mui/lab';
import learningService from '../../../../features/learning/learningService';

function CodeChallengeStep({ step }) {
  const language = globalConstants.programmingLanguages.find(
    (l) => l.id === step.language_id
  );

  const [code, setCode] = useState(step.initial_code ? atob(step.initial_code) : '');
  const {
    submitting,
    result,
    setResult,
    handleSubmit,
    delayExceeded,
    handleRunCode,
    testRunning,
    testResult,
  } = useCodeChallenge(step.id, language.id, step.test_cases[0]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCodeChallenge = async () => {
      if (step.completed) {
        try {
          setLoading(true);
          setResult({ passed: true });
          const codeChallenge = await learningService.getCodeChallenge(step.id);
          setCode(atob(codeChallenge.submitted_code));
        } catch (error) {
          console.error('Failed to get code challenge:', error);
        }
        setLoading(false);
      }
    };

    fetchCodeChallenge();
  }, [step.id]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const handleSolveAgainClick = () => {
    setResult(null);
    setCode(step.initial_code ? atob(step.initial_code) : '');
  };

  return (
    <Box
      component='form'
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(code);
      }}
    >
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

      {result !== null && (
        <Box mb={2}>
          <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            {result.passed ? (
              <CheckCircleIcon color='success' sx={{ mr: 1 }} />
            ) : (
              <CancelIcon color='error' sx={{ mr: 1 }} />
            )}
            <Typography>
              {result.passed ? 'Correct! Well done!' : 'Incorrect.'}
            </Typography>
          </Box>
          {!result.passed ? (
            <Box
              sx={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'grey.300',
                borderRadius: 1,
                maxWidth: 'sm',
              }}
            >
              <AceEditor
                mode={'plain_text'}
                theme='terminal'
                width='100%'
                height='200px'
                fontSize={16}
                showLineNumbers={false}
                readOnly
                highlightActiveLine={false}
                style={{ borderRadius: '4px' }}
                showGutter={false}
                wrapEnabled={true}
                defaultValue={result.message}
              />
            </Box>
          ) : (
            step.proposed_solution && (
              <Accordion
                elevation={0}
                square
                sx={{
                  border: '1px solid lightgray',
                  '&:not(:last-child)': {
                    borderBottom: 0,
                  },
                  '&::before': {
                    display: 'none',
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1-content'
                  id='panel1-header'
                >
                  <Typography>Proposed solution & explanations</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <HtmlContent html={step.proposed_solution} />
                </AccordionDetails>
              </Accordion>
            )
          )}
        </Box>
      )}

      {testResult !== null && (
        <Box mb={2} key={testResult.message}>
          <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
            {testResult.passed ? (
              <CheckCircleIcon color='success' sx={{ mr: 1 }} />
            ) : (
              <CancelIcon color='error' sx={{ mr: 1 }} />
            )}
            <Typography>{testResult.passed ? 'Passed.' : 'Failed.'}</Typography>
          </Box>
          <Box
            sx={{
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: 'grey.300',
              borderRadius: 1,
              maxWidth: 'sm',
            }}
          >
            <AceEditor
              mode={'plain_text'}
              theme='terminal'
              width='100%'
              height='200px'
              fontSize={16}
              showLineNumbers={false}
              readOnly
              highlightActiveLine={false}
              style={{ borderRadius: '4px' }}
              showGutter={false}
              wrapEnabled={true}
              defaultValue={testResult.message}
            />
          </Box>
        </Box>
      )}

      {loading ? (
        <CircularProgress sx={{ display: 'block', my: 2 }} />
      ) : (
        <>
          <Typography variant='body1' color='textSecondary' component='p' gutterBottom>
            {language.name}
          </Typography>
          <Box sx={{ position: 'relative' }}>
            <Box
              sx={{
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: 'grey.300',
                position: 'relative',
              }}
            >
              {(testRunning || submitting) && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    zIndex: 1100,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                  }}
                >
                  <CircularProgress />
                  <Typography variant='body1' textAlign='center' sx={{ mt: 1 }}>
                    {delayExceeded && 'Just a bit longer...'}
                  </Typography>
                </Box>
              )}

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
                  showLineNumbers: true,
                  tabSize: 4,
                }}
                highlightActiveLine={!submitting && !testRunning}
                readOnly={submitting || testRunning}
              />
            </Box>
          </Box>
        </>
      )}

      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {result !== null && result.passed ? (
          <Button
            variant='contained'
            color='primary'
            startIcon={<ReplayIcon />}
            onClick={handleSolveAgainClick}
          >
            Solve again
          </Button>
        ) : (
          <LoadingButton
            type='submit'
            variant='contained'
            color='primary'
            loading={submitting}
            disabled={submitting || testRunning}
            sx={{ marginTop: 2, paddingX: 4 }}
            loadingIndicator='Submitting...'
          >
            Submit
          </LoadingButton>
        )}
        <LoadingButton
          variant='contained'
          color='secondary'
          onClick={() => handleRunCode(code)}
          loading={testRunning}
          sx={{ marginTop: 2, paddingX: 4 }}
          disabled={submitting || testRunning}
          loadingIndicator='Running...'
        >
          Run Code
        </LoadingButton>
      </Box>
    </Box>
  );
}

export default CodeChallengeStep;
