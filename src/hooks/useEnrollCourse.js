import { useState } from 'react';
import catalogService from '../features/catalog/catalogService';

export function useEnrollCourse() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleEnroll = async (courseId) => {
    setLoading(true);
    try {
      await catalogService.courseEnroll(courseId);
      setSuccess(true);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  return { loading, error, success, handleEnroll };
}
