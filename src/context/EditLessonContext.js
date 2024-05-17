import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import videoStepService from '../features/teaching/videoStepService';
import { useSelector } from 'react-redux';

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
  const [videoFiles, setVideoFiles] = useState({});
  const [error, setError] = useState(false);

  const { accessToken } = useSelector((state) => state.users);

  const saveStep = useCallback((step) => {
    setSteps((steps) => {
      const index = steps.findIndex((s) => s.id === step.id);
      steps[index] = step;
      return [...steps];
    });
  }, []);

  const updateVideoFiles = useCallback(async () => {
    for (const stepId in videoFiles) {
      try {
        const formData = new FormData();
        formData.append('video_file', videoFiles[stepId]);
        const response = await videoStepService.updateVideoStep(
          accessToken,
          stepId,
          formData
        );

        setSteps((steps) => {
          const index = steps.findIndex((s) => s.id === stepId);
          steps[index] = response;
          return [...steps];
        });
      } catch (error) {
        console.error('Error uploading video file:', error);
        setError(true);
      }
    }
  }, [selectedStep, videoFiles, accessToken]);

  const handleSave = useCallback(
    async (e) => {
      e.preventDefault();
      console.log('Save lesson');
      setSavePressed((prev) => prev + 1);
      console.log('steps:', steps);
      console.log('selectedStep:', selectedStep);

      const lessonSteps = steps.map((step) => ({ ...step }));
      // remove video_file from steps as it contains the video url, which is not supported by the backend
      for (let step of lessonSteps) {
        if (step.type === 'video') delete step.video_file;
      }

      try {
        await updateVideoFiles(); // Update video files first
        setVideoFiles({}); // Clear video files after saving
        // Save lesson in backend
        // setLesson((lesson) => ({ ...lesson, lesson_steps: lessonSteps, title }));

        // If no errors, set isDirty to false
        setIsDirty(false);
        console.log('Lesson saved successfully');
      } catch (error) {
        console.error('Error saving lesson:', error);
      }
    },
    [steps, selectedStep]
  );

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
    videoFiles,
    setVideoFiles,
    error,
    setError,
  };

  return (
    <EditLessonContext.Provider value={value}>{children}</EditLessonContext.Provider>
  );
}
