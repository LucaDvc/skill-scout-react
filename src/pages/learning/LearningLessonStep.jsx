import React, { useEffect, useMemo, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import VideoStep from '../../components/learning/lesson/steps/VideoStep';
import QuizStep from '../../components/learning/lesson/steps/QuizStep';
import TextStep from '../../components/learning/lesson/steps/TextStep';
import CodeChallengeStep from '../../components/learning/lesson/steps/CodeChallengeStep';
import SortingProblemStep from '../../components/learning/lesson/steps/SortingProblemStep';
import TextProblemStep from '../../components/learning/lesson/steps/TextProblemStep';

function LearningLessonStep() {
  const { stepOrder } = useParams();
  const { steps } = useOutletContext();
  const [timeSpent, setTimeSpent] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const selectedStep = steps.find((step) => step.order === parseInt(stepOrder, 10));

  useEffect(() => {
    // Clear the previous interval
    if (intervalId) {
      clearInterval(intervalId);
    }

    // Reset the timer when the selected step changes
    setTimeSpent(0);

    // Start a new timer
    const newIntervalId = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 1);
    }, 1000);

    // Save the interval ID to state
    setIntervalId(newIntervalId);

    // Cleanup the interval on unmount or when the step changes
    return () => clearInterval(newIntervalId);
  }, [selectedStep]);

  const StepComponent = useMemo(() => {
    const stepComponents = {
      video: VideoStep,
      quiz: QuizStep,
      text: TextStep,
      codechallenge: CodeChallengeStep,
      sorting_problem: SortingProblemStep,
      text_problem: TextProblemStep,
    };
    return stepComponents[selectedStep?.type] || null;
  }, [selectedStep?.type]);

  const RenderedComponent = StepComponent ? <StepComponent step={selectedStep} /> : null;

  return (
    <div>
      <div>Time spent on this step: {timeSpent} seconds</div>
      {RenderedComponent}
    </div>
  );
}

export default LearningLessonStep;
