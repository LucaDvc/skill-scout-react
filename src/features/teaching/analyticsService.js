import axiosInstance from '../../axios';

const API_URL = '/api/teaching/analytics';

const getEnrollmentAnalytics = async (courseId) => {
  const response = await axiosInstance.get(`${API_URL}/${courseId}/enrollment/`);
  return response.data;
};

const analyticsService = {
  getEnrollmentAnalytics,
};

export default analyticsService;
