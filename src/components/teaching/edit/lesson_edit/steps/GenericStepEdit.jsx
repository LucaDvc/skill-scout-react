import React, { useMemo } from 'react';
import VideoStepEdit from './VideoStepEdit';
import QuizStepEdit from './choice-quiz/QuizStepEdit';
import CodeChallengeStepEdit from './code-challenge/CodeChallengeStepEdit';
import TextStepEdit from './TextStepEdit';
import { useEditLesson } from '../../../../../context/EditLessonContext';
import SortingProblemEdit from './sorting-problem/SortingProblemEdit';

function GenericStepEdit() {
  const { selectedStep } = useEditLesson();

  const StepComponent = useMemo(() => {
    const steps = {
      video: <VideoStepEdit />,
      quiz: <QuizStepEdit />,
      text: <TextStepEdit />,
      codechallenge: <CodeChallengeStepEdit />,
      sorting_problem: <SortingProblemEdit />,
    };
    return steps[selectedStep?.type] || null;
  }, [selectedStep, selectedStep?.type]);

  return <div>{StepComponent}</div>;
}

export default GenericStepEdit;
