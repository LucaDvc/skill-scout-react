import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const EditLessonContext = createContext();

export function useEditLesson() {
  return useContext(EditLessonContext);
}

export function EditLessonProvider({ children }) {
  const [lesson, setLesson] = useState({});
  const [steps, setSteps] = useState([]);
  const [selectedStep, setSelectedStep] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [savePressed, setSavePressed] = useState(0);
  const [title, setTitle] = useState('');

  const saveStep = useCallback((step) => {
    setSteps((steps) => {
      const index = steps.findIndex((s) => s.id === step.id);
      steps[index] = step;
      return [...steps];
    });
  }, []);

  const handleSave = useCallback(() => {
    console.log('Save lesson');
    setSavePressed((prev) => prev + 1);
    console.log('steps:', steps);
    console.log('selectedStep:', selectedStep);
    setLesson((lesson) => ({ ...lesson, lesson_steps: steps, title }));
    // save lesson in backend
  }, [steps, selectedStep]);

  const value = {
    lesson,
    setLesson,
    steps,
    setSteps,
    selectedStep,
    setSelectedStep,
    isDirty,
    setIsDirty,
    saveStep,
    handleSave,
    savePressed,
    title,
    setTitle,
  };

  return (
    <EditLessonContext.Provider value={value}>{children}</EditLessonContext.Provider>
  );
}
