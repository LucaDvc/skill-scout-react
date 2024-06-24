import axios from 'axios';
import axiosInstance from '../../axios';

const API_URL = `/api/learning`;

const JUDGE0_API_URL = '/judge0';
const JUDGE0_AUTH_TOKEN = process.env.REACT_APP_JUDGE0_AUTH_TOKEN;

const submitCodeChallenge = async (codeChallengeId, code) => {
  const response = await axiosInstance.post(
    `${API_URL}/code-challenge-steps/${codeChallengeId}/submit/`,
    {
      code,
      acting_role: 'learner',
    }
  );
  return response.data;
};

let timerId = null;

const getSubmissionResult = async (
  taskToken,
  maxRetries = 10,
  retryDelay = 750,
  onDelayExceeded
) => {
  const fetchResult = async (retriesLeft, startTime) => {
    if (retriesLeft === 0) {
      clearTimeout(timerId);
      throw new Error('Max retries exceeded');
    }

    const elapsedTime = Date.now() - startTime;
    if (elapsedTime > 6500) {
      onDelayExceeded(); // Call the callback when delay exceeds 5 seconds
    }

    try {
      const response = await axiosInstance.get(
        `${API_URL}/code-challenge-steps/submissions/${taskToken}`
      );

      if (response.data.status === 'PENDING') {
        return new Promise((resolve) => {
          timerId = setTimeout(() => {
            resolve(fetchResult(retriesLeft - 1, startTime)); // This will return a promise
          }, retryDelay);
        });
      } else {
        clearTimeout(timerId);
        return response.data;
      }
    } catch (error) {
      if (!error.response || error.response.status >= 500) {
        // Retry polling if the error is a network error or a server error
        return new Promise((resolve) => {
          timerId = setTimeout(() => {
            resolve(fetchResult(retriesLeft - 1, startTime));
          }, retryDelay);
        });
      } else {
        clearTimeout(timerId);
        throw error;
      }
    }
  };

  return fetchResult(maxRetries, Date.now());
};

const cancelSubmission = () => {
  clearTimeout(timerId);
  timerId = null;
};

const runCode = async (code, testCase, languageId) => {
  const config = {
    headers: {
      'X-Auth-Token': JUDGE0_AUTH_TOKEN,
    },
  };

  const request = {
    source_code: code,
    language_id: languageId,
    stdin: testCase.input,
    expected_output: testCase.expected_output,
  };

  const response = await axios.post(
    `${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=true`,
    request,
    config
  );

  return response.data;
};

export const codeChallengeService = {
  submitCodeChallenge,
  getSubmissionResult,
  cancelSubmission,
  runCode,
};
