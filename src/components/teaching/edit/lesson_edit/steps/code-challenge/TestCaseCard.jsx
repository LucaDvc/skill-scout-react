import { Card, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

import TestCaseCodeEditor from './TestCaseCodeEditor';

function TestCaseCard({ testCase, index, handleDelete, handleUpdate }) {
  const [input, setInput] = useState(testCase.input ? atob(testCase.input) : '');
  const [output, setOutput] = useState(
    testCase.expected_output ? atob(testCase.expected_output) : ''
  );

  useEffect(() => {
    handleUpdate(index, 'input', btoa(input));
  }, [input]);

  useEffect(() => {
    handleUpdate(index, 'expected_output', btoa(output));
  }, [output]);

  return (
    <Card
      sx={{
        minWidth: '100%',
        marginY: 2,
        borderRadius: 0,
        boxShadow: 0.5,
        borderWidth: 0.1,
        borderColor: 'grey.300',
        borderStyle: 'solid',
      }}
    >
      <CardHeader
        action={
          <IconButton aria-label='delete' onClick={handleDelete}>
            <CloseIcon />
          </IconButton>
        }
        title={<Typography variant='subtitle1'> Test Case #{index + 1}</Typography>}
      />
      <CardContent sx={{ marginX: 1 }}>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          Input
        </Typography>

        <TestCaseCodeEditor value={input} setValue={setInput} />

        <Typography sx={{ fontSize: 14, marginY: 1 }} color='text.secondary'>
          Output
        </Typography>

        <TestCaseCodeEditor value={output} setValue={setOutput} />
      </CardContent>
    </Card>
  );
}

export default TestCaseCard;
