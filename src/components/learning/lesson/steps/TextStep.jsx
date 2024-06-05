import React from 'react';
import HtmlContent from '../../../HtmlContent';

function TextStep({ step }) {
  return <HtmlContent html={step.text} />;
}

export default TextStep;
