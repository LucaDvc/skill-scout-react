import React, { useEffect } from 'react';
import HtmlContent from '../../../HtmlContent';
import { useDispatch } from 'react-redux';
import { completeLessonStep } from '../../../../features/learning/learningSlice';

function TextStep({ step }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!step.completed) {
      dispatch(completeLessonStep(step.id));
    }
  }, [dispatch, step]);

  return <HtmlContent html={step.text} />;
}

export default TextStep;
