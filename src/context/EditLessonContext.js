import React, { createContext, useContext, useState } from 'react';
import videoStepService from '../features/teaching/videoStepService';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateLesson } from '../features/teaching/teachingSlice';
import { validateLesson } from '../utils/lessonValidators';

function isUUIDv4(uuid) {
  // Regular expression to match a valid UUIDv4
  const uuidv4Pattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  // Test the uuid against the regular expression
  return uuidv4Pattern.test(uuid);
}

const EditLessonContext = createContext();

export function useEditLesson() {
  return useContext(EditLessonContext);
}

export const EditLessonProvider = ({ children }) => {
  const [lesson, setLesson] = useState({});
  const [steps, setSteps] = useState([]);
  const [selectedStep, setSelectedStep] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [title, setTitle] = useState('');
  const [videoFiles, setVideoFiles] = useState({});
  const [loading, setLoading] = useState(false);

  const { accessToken } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const saveStep = (step) => {
    setSteps((steps) => {
      const index = steps.findIndex((s) => s.id === step.id);
      steps[index] = step;
      return [...steps];
    });
  };

  const updateVideoFiles = async () => {
    const updatedSteps = [...steps];

    const uploadPromises = Object.keys(videoFiles).map(async (stepId) => {
      try {
        const formData = new FormData();
        const currentVideoStep = updatedSteps.find((s) => s.id === stepId);
        formData.append('title', currentVideoStep.title);
        formData.append('video_file', videoFiles[stepId]);

        const response = isUUIDv4(stepId)
          ? await videoStepService.updateVideoStep(accessToken, stepId, formData)
          : await videoStepService.createVideoStep(accessToken, lesson.id, formData);

        const index = updatedSteps.findIndex((s) => s.id === stepId);
        if (index !== -1) {
          updatedSteps[index] = { ...response, order: currentVideoStep.order };
        }
        return response;
      } catch (error) {
        console.error('Error uploading video file:', error);
        toast.error('Error uploading video file. Please try again.');
        throw error;
      }
    });

    await Promise.all(uploadPromises);
    return updatedSteps;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    saveStep(selectedStep);

    const isValid = await validateLesson(title, steps);
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const updatedSteps = await updateVideoFiles(); // Update video files first
      setVideoFiles({}); // Clear video files after saving

      // Save lesson in backend
      const updatedLesson = await dispatch(
        updateLesson({
          id: lesson.id,
          lesson: {
            ...lesson,
            title,
            lesson_steps: updatedSteps,
          },
        })
      ).unwrap();

      // If no errors, set update lesson in context and set isDirty to false
      setLesson(updatedLesson);
      setIsDirty(false);
      toast.success('Lesson saved successfully');
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
    setLoading(false);
  };

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
    title,
    setTitle,
    videoFiles,
    setVideoFiles,
    loading,
  };

  return (
    <EditLessonContext.Provider value={value}>{children}</EditLessonContext.Provider>
  );
};
