import React, { useMemo } from 'react';
import VideoStepEdit from './VideoStepEdit';
import QuizStepEdit from './choice-quiz/QuizStepEdit';
import CodeChallengeStepEdit from './code-challenge/CodeChallengeStepEdit';
import TextStepEdit from './TextStepEdit';
import { useEditLesson } from '../../../../../context/EditLessonContext';
import SortingProblemEdit from './sorting-problem/SortingProblemEdit';
import TextProblemStepEdit from './text-problem/TextProblemStepEdit';

function GenericStepEdit() {
  const { selectedStep } = useEditLesson();

  const StepComponent = useMemo(() => {
    const stepComponents = {
      video: VideoStepEdit,
      quiz: QuizStepEdit,
      text: TextStepEdit,
      codechallenge: CodeChallengeStepEdit,
      sorting_problem: SortingProblemEdit,
      text_problem: TextProblemStepEdit,
    };
    return stepComponents[selectedStep?.type] || null;
  }, [selectedStep?.type]);

  const RenderedComponent = StepComponent ? <StepComponent /> : null;

  return <div>{RenderedComponent}</div>;
}

export default GenericStepEdit;
