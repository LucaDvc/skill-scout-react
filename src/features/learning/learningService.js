import axiosInstance from '../../axios';

const API_URL = '/api/learning';

const getCourseReviews = async (courseId, params) => {
  const response = await axiosInstance.get(`${API_URL}/courses/${courseId}/reviews/`, {
    params,
  });
  return response.data;
};

const getCourses = async () => {
  const response = await axiosInstance.get(`${API_URL}/courses/`);
  return response.data;
};

const getCourseById = async (id) => {
  const response = await axiosInstance.get(`${API_URL}/courses/${id}/`);
  return response.data;
};

const getFavouriteCourses = async () => {
  const response = await axiosInstance.get(`${API_URL}/courses/favourites/`);
  return response.data;
};

// Adds or removes a course from the user's favourite list
const updateFavouriteCourse = async (request) => {
  const response = await axiosInstance.post(`${API_URL}/courses/favourites/`, request);
  return response.data;
};

const learningService = {
  getCourseReviews,
  getCourses,
  getCourseById,
  getFavouriteCourses,
  updateFavouriteCourse,
};

export default learningService;
