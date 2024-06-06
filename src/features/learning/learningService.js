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
  const response = await axiosInstance.get(`${API_URL}/courses/${id}`);
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

const getUserCourseReview = async (courseId) => {
  const response = await axiosInstance.get(`${API_URL}/courses/${courseId}/user-review/`);
  return response.data;
};

const postReview = async (courseId, request) => {
  const response = await axiosInstance.post(
    `${API_URL}/courses/${courseId}/reviews/`,
    request
  );
  return response.data;
};

const updateReview = async (reviewId, request) => {
  const response = await axiosInstance.put(`${API_URL}/reviews/${reviewId}/`, request);
  return response.data;
};

const sendEngagementData = async (stepId, timeSpent) => {
  const response = await axiosInstance.post(`${API_URL}/analytics/engagement/`, {
    step_id: stepId,
    time_spent: timeSpent,
  });
  return response.data;
};

const completeLessonStep = async (stepId) => {
  const response = await axiosInstance.post(`${API_URL}/progress/steps/${stepId}/`);
  return response.data;
};

const submitQuiz = async (stepId, request) => {
  const response = await axiosInstance.post(`${API_URL}/quiz-steps/${stepId}/`, request);
  return response.data;
};

const getQuizStep = async (stepId) => {
  const response = await axiosInstance.get(`${API_URL}/quiz-steps/${stepId}/`);
  return response.data;
};

const submitSortingProblem = async (stepId, request) => {
  const response = await axiosInstance.post(
    `${API_URL}/sorting-steps/${stepId}/`,
    request
  );
  return response.data;
};

const getSortingProblem = async (stepId) => {
  const response = await axiosInstance.get(`${API_URL}/sorting-steps/${stepId}/`);
  return response.data;
};

const learningService = {
  getCourseReviews,
  getCourses,
  getCourseById,
  getFavouriteCourses,
  updateFavouriteCourse,
  getUserCourseReview,
  postReview,
  updateReview,
  sendEngagementData,
  completeLessonStep,
  submitQuiz,
  getQuizStep,
  submitSortingProblem,
  getSortingProblem,
};

export default learningService;
