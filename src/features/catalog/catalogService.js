import axios from 'axios';
import axiosInstance from '../../axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const API_URL = `${BASE_URL}/api/catalog`;

const getHighestRatedCourses = async () => {
  const response = await axios.get(`${API_URL}/web/courses/?page=1&ordering=-avg_rating`);
  return response.data;
};

const getPopularCourses = async () => {
  const response = await axios.get(
    `${API_URL}/web/courses/?page=1&ordering=-enrolled_learners`
  );
  return response.data;
};

const getCoursesByFilter = async (params) => {
  const response = await axios.get(`${API_URL}/web/courses/`, { params });
  return response.data;
};

const getTags = async () => {
  const response = await axios.get(`${API_URL}/tags/`);
  return response.data;
};

const getCourseById = async (id) => {
  const response = await axios.get(`${API_URL}/courses/${id}/`);
  return response.data;
};

const wishlistCourse = async (courseId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axiosInstance.post(
    `${API_URL}/courses/${courseId}/wishlist/`,
    null,
    config
  );
  return response.data;
};

const getCourseReviews = async (courseId, params) => {
  const response = await axios.get(`${API_URL}/courses/${courseId}/reviews/`, { params });
  return response.data;
};

const getWishlist = async () => {
  const response = await axiosInstance.get(`${API_URL}/wishlist/`);
  return response.data;
};

const courseEnroll = async (courseId) => {
  const response = await axiosInstance.post(`${API_URL}/courses/${courseId}/enroll/`);
  return response.data;
};

const catalogService = {
  getHighestRatedCourses,
  getPopularCourses,
  getCoursesByFilter,
  getTags,
  getCourseById,
  wishlistCourse,
  getCourseReviews,
  getWishlist,
  courseEnroll,
};

export default catalogService;
