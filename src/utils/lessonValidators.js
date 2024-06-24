import { toast } from 'react-toastify';

// Singleton handler for loading Pyodide
let pyodidePromise = null;
const loadPyodideSingleton = () => {
  if (!pyodidePromise) {
    pyodidePromise = window.loadPyodide();
  }
  return pyodidePromise;
};

export const validateLesson = async (title, steps) => {
  if (!title) {
    toast.error('Title is required for lesson.');
    return false;
  }

  const pyodide = await loadPyodideSingleton();

  if (!(await validateSteps(steps, pyodide))) {
    return false;
  }

  return true;
};

const validateRegex = async (pyodide, regex) => {
  if (!pyodide) {
    console.error('Pyodide not loaded');
    return false;
  }

  const code = `
import re
def is_valid_regex(pattern):
  try:
      re.compile(pattern)
      return True
  except re.error:
      return False

is_valid_regex(${JSON.stringify(regex)})`;

  try {
    return await pyodide.runPythonAsync(code);
  } catch (error) {
    console.error('Error validating regex:', error);
    return false;
  }
};

const validateSteps = async (steps, pyodide) => {
  let isValid = true;
  for (const step of steps) {
    switch (step.type) {
      case 'text_problem':
        if (!(await validateTextProblem(step, pyodide))) {
          isValid = false;
        }
        break;
      case 'text':
        if (!validateTextStep(step)) {
          isValid = false;
        }
        break;
      case 'quiz':
        if (!validateQuizStep(step)) {
          isValid = false;
        }
        break;
      case 'codechallenge':
        if (!validateCodeChallengeStep(step)) {
          isValid = false;
        }
        break;
      case 'sorting_problem':
        if (!validateSortingProblem(step)) {
          isValid = false;
        }
        break;
      case 'video':
        break;
      default:
        console.error(`Unknown step type: ${step.type}`);
        isValid = false;
    }
  }
  return isValid;
};

const validateTextProblem = async (step, pyodide) => {
  let isValid = true;
  if (!step.statement || !step.correct_answer || !step.title) {
    isValid = false;
    toast.error(
      `Statement, title and correct answer are required for text problems (step ${step.order}).`
    );
  }
  if (step.allow_regex) {
    const isValidRegex = await validateRegex(pyodide, step.correct_answer);
    if (!isValidRegex) {
      isValid = false;
      toast.error(`Invalid regex pattern in text problem (step ${step.order}).`);
    }
  }
  return isValid;
};

const validateTextStep = (step) => {
  let isValid = true;
  if (!step.text) {
    isValid = false;
    toast.error(`Content is required for text steps (step ${step.order}).`);
  }

  return isValid;
};

const validateQuizStep = (step) => {
  let isValid = true;
  if (!step.question) {
    isValid = false;
    toast.error(`Question is required for quiz steps (step ${step.order}).`);
  }
  if (step.quiz_choices.length < 2) {
    isValid = false;
    toast.error(`At least two options are required for quiz steps (step ${step.order}).`);
  }
  if (!step.quiz_choices.some((choice) => choice.correct)) {
    isValid = false;
    toast.error(
      `At least one correct option is required for quiz steps (step ${step.order}).`
    );
  }
  return isValid;
};

const validateCodeChallengeStep = (step) => {
  let isValid = true;
  if (!step.title || !step.description || !step.initial_code || !step.language_id) {
    isValid = false;
    toast.error(
      `Title, description, initial code and language are required for code challenge steps (step ${step.order}).`
    );
  }

  // at least 5 test cases, none should be empty and duplicates are not allowed
  if (step.test_cases.length < 5) {
    isValid = false;
    toast.error(
      `At least 5 test cases are required for code challenge steps (step ${step.order}).`
    );
  }
  const testCases = new Set();
  for (const testCase of step.test_cases) {
    if (!testCase.input || !testCase.expected_output) {
      isValid = false;
      toast.error(
        `Input and output are required for test cases in code challenge steps (step ${step.order}).`
      );
      break;
    }
    const key = `${testCase.input} ${testCase.expected_output}`;
    if (testCases.has(key)) {
      isValid = false;
      toast.error(
        `Duplicate test cases are not allowed in code challenge steps (step ${step.order}).`
      );
      break;
    }
    testCases.add(key);
  }

  return isValid;
};

const validateSortingProblem = (step) => {
  let isValid = true;
  if (!step.statement || !step.title) {
    toast.error(
      `Statement and title are required for sorting problems (step ${step.order}).`
    );
    isValid = false;
  }
  // at least 2 options
  if (step.options.length < 2) {
    toast.error(
      `At least two options are required for sorting problems (step ${step.order}).`
    );
    isValid = false;
  }
  return isValid;
};
