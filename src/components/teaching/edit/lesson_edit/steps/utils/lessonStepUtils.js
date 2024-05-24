import { nanoid } from 'nanoid';

const exportTextStep = (lessonStep) => ({
  text: lessonStep.text,
  type: 'text',
});

const exportQuizStep = (lessonStep) => ({
  question: lessonStep.question,
  explanation: lessonStep.explanation,
  quiz_choices: lessonStep.quiz_choices.map((choice) => ({
    text: choice.text,
    correct: choice.correct,
  })),
  type: 'quiz',
  multiple_choice: lessonStep.multiple_choice,
});

const exportCodeStep = (lessonStep) => ({
  title: lessonStep.title,
  description: lessonStep.description,
  language_id: lessonStep.language_id,
  initial_code: lessonStep.initial_code,
  proposed_solution: lessonStep.proposed_solution,
  test_cases: lessonStep.test_cases.map((testCase) => ({
    input: atob(testCase.input),
    expected_output: atob(testCase.expected_output),
  })),
  type: 'codechallenge',
});

const exportSortingProblemStep = (lessonStep) => ({
  statement: lessonStep.statement,
  title: lessonStep.title,
  options: lessonStep.options.map((option) => ({
    text: option.text,
    correct_order: option.correct_order,
  })),
  type: 'sorting_problem',
});

const downloadLessonStep = (lessonStep) => {
  let stepData;
  switch (lessonStep.type) {
    case 'text':
      stepData = exportTextStep(lessonStep);
      break;
    case 'quiz':
      stepData = exportQuizStep(lessonStep);
      break;
    case 'codechallenge':
      stepData = exportCodeStep(lessonStep);
      break;
    case 'sorting_problem':
      stepData = exportSortingProblemStep(lessonStep);
      break;
    default:
      throw new Error(`Unknown step type: ${lessonStep.type}`);
  }

  // Convert the step data to a JSON string
  const jsonString = JSON.stringify(stepData, null, 2);

  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement('a');
  link.href = url;
  link.download = `${lessonStep.type}-step-${nanoid()}.step.json`;

  // Programmatically click the link to trigger the download
  link.click();

  // Cleanup: remove the link after download
  URL.revokeObjectURL(url);
};

const validateTextStep = (stepData) => {
  if (typeof stepData.text !== 'string') {
    throw new Error('Invalid text step: text must be a string.');
  }
};

const validateQuizStep = (stepData) => {
  if (
    typeof stepData.question !== 'string' ||
    typeof stepData.explanation !== 'string' ||
    !Array.isArray(stepData.quiz_choices) ||
    typeof stepData.multiple_choice !== 'boolean'
  ) {
    throw new Error('Invalid quiz step: invalid structure.');
  }

  stepData.quiz_choices.forEach((choice) => {
    if (typeof choice.text !== 'string' || typeof choice.correct !== 'boolean') {
      throw new Error('Invalid quiz step: invalid quiz choice.');
    }
  });
};

const validateCodeStep = (stepData) => {
  if (
    typeof stepData.title !== 'string' ||
    typeof stepData.description !== 'string' ||
    typeof stepData.language_id !== 'number' ||
    (typeof stepData.initial_code !== 'string' && stepData.initial_code !== null) ||
    (typeof stepData.proposed_solution !== 'string' &&
      stepData.proposed_solution !== null) ||
    !Array.isArray(stepData.test_cases)
  ) {
    throw new Error('Invalid code step: invalid structure.');
  }

  stepData.test_cases.forEach((testCase) => {
    if (
      typeof testCase.input !== 'string' ||
      typeof testCase.expected_output !== 'string'
    ) {
      throw new Error('Invalid code step: invalid test case.');
    }
  });
};

const validateSortingProblemStep = (stepData) => {
  if (
    typeof stepData.statement !== 'string' ||
    typeof stepData.title !== 'string' ||
    !Array.isArray(stepData.options)
  ) {
    throw new Error('Invalid sorting problem step: invalid structure.');
  }

  stepData.options.forEach((option) => {
    if (typeof option.text !== 'string' || typeof option.correct_order !== 'number') {
      throw new Error('Invalid sorting problem step: invalid option.');
    }
  });
};

const importLessonStep = (jsonString, currentStepType) => {
  let stepData;
  try {
    stepData = JSON.parse(jsonString);
  } catch (e) {
    throw new Error('Invalid JSON format.');
  }

  if (stepData.type !== currentStepType) {
    throw new Error(
      `Invalid step type uploaded. Create a new lesson step of type ${stepData.type}.`
    );
  }

  switch (stepData.type) {
    case 'text':
      validateTextStep(stepData);
      break;
    case 'quiz':
      validateQuizStep(stepData);
      stepData = {
        ...stepData,
        quiz_choices: stepData.quiz_choices.map((choice) => ({
          id: nanoid(),
          ...choice,
        })),
      };
      break;
    case 'codechallenge':
      validateCodeStep(stepData);
      stepData = {
        ...stepData,
        test_cases: stepData.test_cases.map((testCase) => ({
          id: nanoid(),
          input: btoa(testCase.input),
          expected_output: btoa(testCase.expected_output),
        })),
      };
      break;
    case 'sorting_problem':
      validateSortingProblemStep(stepData);
      stepData = {
        ...stepData,
        options: stepData.options.map((option) => ({
          id: nanoid(),
          ...option,
        })),
      };
      break;
    default:
      throw new Error(`Unknown step type: ${stepData.type}`);
  }

  return stepData;
};

const importStepFromFile = (file, currentStepType) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const stepData = importLessonStep(event.target.result, currentStepType);
        resolve(stepData);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => {
      reject(new Error('Error reading file'));
    };
    reader.readAsText(file);
  });
};

export { downloadLessonStep, importStepFromFile };
