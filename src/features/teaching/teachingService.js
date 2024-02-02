import axios from 'axios';

const API_URL = '/api/teaching';

const getCourses = async (token) => {
  const response = await axios.get(`${API_URL}/courses/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const deleteCourse = async (token, id) => {
  const response = await axios.delete(`${API_URL}/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const teachingService = {
  getCourses,
  deleteCourse,
};

export default teachingService;
