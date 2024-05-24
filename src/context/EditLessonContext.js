import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import videoStepService from '../features/teaching/videoStepService';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateLesson } from '../features/teaching/teachingSlice';
import { validateLesson } from '../utils/lessonValidators';

const EditLessonContext = createContext();

export function useEditLesson() {
  return useContext(EditLessonContext);
}

export const EditLessonProvider = ({ children }) => {
  const [lesson, setLesson] = useState({});
  const [steps, setSteps] = useState([]);
  const [selectedStep, setSelectedStep] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [savePressed, setSavePressed] = useState(0);
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
    for (const stepId in videoFiles) {
      try {
        const formData = new FormData();
        console.log(stepId, videoFiles[stepId]);
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
        toast.error('Error uploading video file. Please try again.');
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log('Save lesson');
    setSavePressed((prev) => prev + 1);
    console.log('steps:', steps);
    console.log('selectedStep:', selectedStep);

    const isValid = await validateLesson(title, steps);
    if (!isValid) {
      setLoading(false);
      return;
    }

    const lessonSteps = steps.map((step) => ({ ...step }));
    // remove video_file from steps as it contains the video url, which is not supported by the backend
    for (let step of lessonSteps) {
      if (step.type === 'video') delete step.video_file;
    }

    try {
      await updateVideoFiles(); // Update video files first
      setVideoFiles({}); // Clear video files after saving

      // Save lesson in backend
      const updatedLesson = await dispatch(
        updateLesson({
          id: lesson.id,
          lesson: {
            ...lesson,
            title,
            lesson_steps: lessonSteps,
          },
        })
      ).unwrap();

      // If no errors, set update lesson in context and set isDirty to false
      setLesson(updatedLesson);
      setIsDirty(false);
      toast.success('Lesson saved successfully');
      console.log('Lesson saved successfully');
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
    savePressed,
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
