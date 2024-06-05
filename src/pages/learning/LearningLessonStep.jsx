import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import VideoStep from '../../components/learning/lesson/steps/VideoStep';
import QuizStep from '../../components/learning/lesson/steps/QuizStep';
import TextStep from '../../components/learning/lesson/steps/TextStep';
import CodeChallengeStep from '../../components/learning/lesson/steps/CodeChallengeStep';
import SortingProblemStep from '../../components/learning/lesson/steps/SortingProblemStep';
import TextProblemStep from '../../components/learning/lesson/steps/TextProblemStep';
import learningService from '../../features/learning/learningService';

function LearningLessonStep() {
  const { stepOrder } = useParams();
  const { steps } = useOutletContext();
  const [intervalId, setIntervalId] = useState(null);
  const selectedStep = steps.find((step) => step.order === parseInt(stepOrder, 10));
  const timeSpentRef = useRef(0);

  useEffect(() => {
    // Clear the previous interval
    if (intervalId) {
      clearInterval(intervalId);
    }

    // Reset the timer when the selected step changes
    timeSpentRef.current = 0;

    // Start a new timer
    const newIntervalId = setInterval(() => {
      timeSpentRef.current += 1;
    }, 1000);

    // Save the interval ID to state
    setIntervalId(newIntervalId);

    return () => {
      // Send the data to the server if the user spent more than 5 seconds on the step
      if (timeSpentRef.current >= 5) {
        console.log('time spent', timeSpentRef.current);
        try {
          learningService.sendEngagementData(selectedStep.id, timeSpentRef.current);
        } catch (error) {
          console.error('Failed to send engagement data', error);
        }
      }
      // Cleanup the interval on unmount or when the step changes
      clearInterval(newIntervalId);
    };
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

  return <div>{RenderedComponent}</div>;
}

export default LearningLessonStep;
