import React, { useEffect, useMemo, useState } from 'react';
import VideoStepEdit from './VideoStepEdit';
import QuizStepEdit from './QuizStepEdit';
import CodeChallengeStepEdit from './code-challenge/CodeChallengeStepEdit';
import TextStepEdit from './TextStepEdit';
import { useEditLesson } from '../../../../../context/EditLessonContext';

function GenericStepEdit() {
  const { selectedStep } = useEditLesson();

  const StepComponent = useMemo(() => {
    const steps = {
      video: <VideoStepEdit />,
      quiz: <QuizStepEdit />,
      text: <TextStepEdit />,
      codechallenge: <CodeChallengeStepEdit />,
    };
    return steps[selectedStep.type] || null;
  }, [selectedStep, selectedStep.type]);

  return <div>{StepComponent}</div>;
}

export default GenericStepEdit;
