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

const teachingService = {
  getCourses,
};

export default teachingService;
