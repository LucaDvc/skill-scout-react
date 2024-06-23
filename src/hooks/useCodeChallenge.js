import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { completeLessonStep } from '../features/learning/learningSlice';
import { codeChallengeService } from '../features/learning/codeChallengeService';

export const useCodeChallenge = (lessonStepId, languageId, firstTestCase) => {
  const [submissionToken, setSubmissionToken] = useState(null);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [delayExceeded, setDelayExceeded] = useState(false);

  const [failedTestCase, setFailedTestCase] = useState(firstTestCase);
  const [testRunning, setTestRunning] = useState(false);
  const [testResult, setTestResult] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = async (code) => {
    setResult(null);
    setTestResult(null);
    setSubmitting(true);

    if (!code) {
      toast.error('Please write some code before submitting.');
      setSubmitting(false);
      return;
    }

    try {
      const response = await codeChallengeService.submitCodeChallenge(
        lessonStepId,
        btoa(code)
      );
      setSubmissionToken(response.token);
    } catch (error) {
      console.error('Failed to fetch task token:', error);
      toast.error('Failed to submit code. Please try again.');
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchResult = async () => {
      const onDelayExceeded = () => {
        setDelayExceeded(true);
      };

      try {
        const response = await codeChallengeService.getSubmissionResult(
          submissionToken,
          20,
          750,
          onDelayExceeded
        );
        const submission = response.submission;
        if (submission.passed) {
          setResult({ passed: true });
          dispatch(completeLessonStep(lessonStepId));
        } else {
          if (!submission.error_message) {
            const firstFailedTest = submission.test_results.find((test) => !test.passed);
            setFailedTestCase(firstFailedTest);
            const input = atob(firstFailedTest.input);
            const expectedOutput = atob(firstFailedTest.expected_output);
            const actualOutput = firstFailedTest.stdout && atob(firstFailedTest.stdout);
            setResult({
              passed: false,
              message: `Test case failed.\n\nInput: ${input}\n\nExpected output: ${expectedOutput}\n\nYour code output:\n${actualOutput}`,
            });
          } else {
            const testWithError = submission.test_results.find(
              (test) => test.compile_err || test.stderr
            );
            setFailedTestCase(testWithError);
            const errorMessageBase64 = testWithError.compile_err || testWithError.stderr;
            const errorMessage = atob(errorMessageBase64);
            setResult({
              passed: false,
              message: `${testWithError.status}\n\nInput: ${atob(
                testWithError.input
              )}\n\nError:\n${errorMessage}`,
            });
          }
        }
      } catch (error) {
        console.error('Failed to fetch submission result:', error);
        toast.error('Failed to fetch submission result. Please try again.');
      } finally {
        setSubmitting(false);
        setDelayExceeded(false);
      }
    };

    if (submissionToken) {
      fetchResult();
    }
  }, [submissionToken]);

  const handleRunCode = async (code) => {
    setTestRunning(true);
    if (!code) {
      toast.error('Please write some code before running the test.');
      setTestRunning(false);
      return;
    }

    try {
      const response = await codeChallengeService.runCode(
        btoa(code),
        failedTestCase,
        languageId
      );

      if (response.status.description === 'Accepted') {
        setTestResult({
          passed: true,
          message: `Test case passed.\n\nInput: ${atob(
            failedTestCase.input
          )}\n\nOutput: \n${atob(response.stdout)}`,
        });
      } else if (response.status.description === 'Wrong Answer') {
        setTestResult({
          passed: false,
          message: `Test case failed.\n\nInput: ${atob(
            failedTestCase.input
          )}\n\nExpected output: ${atob(
            failedTestCase.expected_output
          )}\n\nYour code output: \n${atob(response.stdout)}`,
        });
      } else {
        setTestResult({
          passed: false,
          message: `Test case failed.\n\nInput: ${atob(
            failedTestCase.input
          )}\n\nError: ${atob(response.stderr || response.compile_output)}`,
        });
      }
    } catch (error) {
      console.error('Failed to run code:', error);
      toast.error('Failed to run code. Please try again.');
    }
    setTestRunning(false);
  };

  return {
    submitting,
    result,
    setResult,
    handleSubmit,
    delayExceeded,

    testRunning,
    failedTestCase,
    handleRunCode,
    testResult,
  };
};
