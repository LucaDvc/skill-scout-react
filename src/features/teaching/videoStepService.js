import axios from 'axios';

const API_URL = '/api/teaching/video-steps';

const updateVideoStep = async (token, id, videoStep) => {
  const response = await axios.put(`${API_URL}/${id}/`, videoStep, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const videoStepService = {
  updateVideoStep,
};

export default videoStepService;
