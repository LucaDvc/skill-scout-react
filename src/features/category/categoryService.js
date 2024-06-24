import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;
const API_URL = `${BASE_URL}/api/catalog`;

// Get category list
const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories/`);
  return response.data;
};

const categoryService = {
  getCategories,
};

export default categoryService;
