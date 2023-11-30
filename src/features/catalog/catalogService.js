import axios from 'axios';

const API_URL = '/api/catalog';

// Get category list
const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories/`);
  return response.data;
};

const catalogService = {
  getCategories,
};

export default catalogService;
