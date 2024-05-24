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

  if (!(await validateTextProblems(steps, pyodide))) {
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

const validateTextProblems = async (steps, pyodide) => {
  let isValid = true;
  for (const step of steps) {
    if (step.type === 'text_problem') {
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
    }
  }
  return isValid;
};
