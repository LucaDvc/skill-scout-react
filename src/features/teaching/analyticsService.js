import axiosInstance from '../../axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const API_URL = `${BASE_URL}/api/teaching/analytics`;

const getEnrollmentAnalytics = async (courseId) => {
  const response = await axiosInstance.get(`${API_URL}/${courseId}/enrollment/`);
  return response.data;
};

const getActiveUsersAnalytics = async (courseId) => {
  const response = await axiosInstance.get(`${API_URL}/${courseId}/activity/`);
  return response.data;
};

const getLessonsEngagementAnalytics = async (courseId) => {
  const response = await axiosInstance.get(`${API_URL}/${courseId}/lessons-engagement/`);
  return response.data;
};

const getLessonStepsEngagementAnalytics = async (courseId) => {
  const response = await axiosInstance.get(`${API_URL}/${courseId}/steps-engagement/`);
  return response.data;
};

const getCourseCompletionAnalytics = async (courseId) => {
  const response = await axiosInstance.get(`${API_URL}/${courseId}/completion/`);
  return response.data;
};

const getAssessmentsAnalytics = async (courseId) => {
  const response = await axiosInstance.get(`${API_URL}/${courseId}/assessments/`);
  return response.data;
};

const analyticsService = {
  getEnrollmentAnalytics,
  getActiveUsersAnalytics,
  getLessonsEngagementAnalytics,
  getCourseCompletionAnalytics,
  getLessonStepsEngagementAnalytics,
  getAssessmentsAnalytics,
};

export default analyticsService;
