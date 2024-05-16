import React, { useEffect, useMemo, useState } from 'react';
import VideoStepEdit from './VideoStepEdit';
import QuizStepEdit from './QuizStepEdit';
import CodeChallengeStepEdit from './CodeChallengeStepEdit';
import TextStepEdit from './TextStepEdit';
import { useEditLesson } from '../../../../../context/EditLessonContext';

function GenericStepEdit() {
  const { selectedStep, saveStep, savePressed } = useEditLesson();

  useEffect(() => {
    saveStep(selectedStep);
  }, [savePressed]);

  useEffect(() => {
    return () => {
      saveStep(selectedStep);
    };
  }, [selectedStep, saveStep]);

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
