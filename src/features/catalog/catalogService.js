import axios from 'axios';

const API_URL = '/api/catalog';

const getHighestRatedCourses = async () => {
  const response = await axios.get(
    `${API_URL}/courses/?page=1&ordering=-avg_rating`
  );
  return response.data;
};

const getPopularCourses = async () => {
  const response = await axios.get(
    `${API_URL}/courses/?page=1&ordering=-enrolled_learners`
  );
  return response.data;
};

const getCoursesByFilter = async (params) => {
  const response = await axios.get(`${API_URL}/courses/`, { params });
  return response.data;
};

const getTags = async () => {
  const response = await axios.get(`${API_URL}/tags/`);
  return response.data;
};

const catalogService = {
  getHighestRatedCourses,
  getPopularCourses,
  getCoursesByFilter,
  getTags,
};

export default catalogService;
