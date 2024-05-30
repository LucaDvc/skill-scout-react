import axiosInstance from '../../axios';

const API_URL = '/api/teaching';

const getCourses = async (token) => {
  const response = await axiosInstance.get(`${API_URL}/courses/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteCourse = async (token, id) => {
  const response = await axiosInstance.delete(`${API_URL}/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createCourse = async (token, course, isImageUrl) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': isImageUrl ? 'application/json' : 'multipart/form-data',
    },
  };

  const response = await axiosInstance.post(`${API_URL}/courses/`, course, config);
  return response.data;
};

const getCourseById = async (token, id) => {
  const response = await axiosInstance.get(`${API_URL}/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateCourse = async (token, id, updatedCourse) => {
  const response = await axiosInstance.put(`${API_URL}/courses/${id}/`, updatedCourse, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const updateLesson = async (token, id, updatedLesson) => {
  const response = await axiosInstance.put(`${API_URL}/lessons/${id}/`, updatedLesson, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const deleteLesson = async (token, id) => {
  const response = await axiosInstance.delete(`${API_URL}/lessons/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const publishCourse = async (id) => {
  const response = await axiosInstance.post(`${API_URL}/courses/${id}/publish/`);
  return response.data;
};

const teachingService = {
  getCourses,
  deleteCourse,
  createCourse,
  getCourseById,
  updateCourse,
  updateLesson,
  deleteLesson,
  publishCourse,
};

export default teachingService;
