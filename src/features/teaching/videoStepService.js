import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const API_URL = `${BASE_URL}/api/teaching`;

const createVideoStep = async (token, lessonId, videoStep) => {
  const response = await axios.post(
    `${API_URL}/lessons/${lessonId}/video-steps/`,
    videoStep,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const updateVideoStep = async (token, id, videoStep) => {
  const response = await axios.put(`${API_URL}/video-steps/${id}/`, videoStep, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const videoStepService = {
  createVideoStep,
  updateVideoStep,
};

export default videoStepService;
