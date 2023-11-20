import axios from 'axios';

const API_URL = '/api/users';

// Register new user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register/`, userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
};

// Login user
const login = async (userData) => {
  const { email, password, rememberMe } = userData;
  const response = await axios.post(`${API_URL}/login/`, { email, password });
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('accessToken', response.data.tokens.access);

    if (rememberMe) {
      localStorage.setItem('refreshToken', response.data.tokens.refresh);
    }
  }
  return response.data;
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
