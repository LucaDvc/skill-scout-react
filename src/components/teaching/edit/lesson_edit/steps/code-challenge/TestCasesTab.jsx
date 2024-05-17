import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React, { useState } from 'react';
import { useEditLesson } from '../../../../../../context/EditLessonContext';
import TestCaseCard from './TestCaseCard';

function TestCasesTab() {
  const {
    selectedStep: codeChallenge,
    setSelectedStep: setCodeChallenge,
    saveStep,
    setIsDirty,
  } = useEditLesson();

  const deleteTestCase = (index) => {
    const updatedTestCases = codeChallenge.test_cases.filter((_, i) => i !== index);
    setCodeChallenge({ ...codeChallenge, test_cases: updatedTestCases });
    setIsDirty(true);
  };

  const addTestCase = () => {
    const updatedTestCases = [...codeChallenge.test_cases, { input: '', output: '' }];
    setCodeChallenge({ ...codeChallenge, test_cases: updatedTestCases });
    setIsDirty(true);
  };

  const updateTestCase = (index, field, value) => {
    const updatedTestCases = codeChallenge.test_cases.map((testCase, i) =>
      i === index ? { ...testCase, [field]: value } : testCase
    );
    setCodeChallenge({ ...codeChallenge, test_cases: updatedTestCases });
    setIsDirty(true);
  };

  return (
    <>
      <Typography variant='body1' color='textSecondary' component='p' gutterBottom>
        Add test cases to check the correctness of a learner's code. The submitted
        solution will be tested on every test case.
      </Typography>
      <Button
        startIcon={<AddIcon />}
        variant='contained'
        color='secondary'
        onClick={addTestCase}
      >
        Add test case
      </Button>
      {codeChallenge.test_cases.map((testCase, index) => (
        <TestCaseCard
          key={testCase.id || index}
          testCase={testCase}
          index={index}
          handleDelete={() => deleteTestCase(index)}
          handleUpdate={updateTestCase}
        />
      ))}
    </>
  );
}

export default TestCasesTab;
