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
  localStorage.removeItem('refreshToken');
  sessionStorage.removeItem('accessToken');
};

// Login user
const login = async (userData) => {
  const { email, password, rememberMe } = userData;
  const response = await axios.post(`${API_URL}/login/`, { email, password });
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user));
    sessionStorage.setItem('accessToken', response.data.tokens.access);

    if (rememberMe) {
      localStorage.setItem('refreshToken', response.data.tokens.refresh);
    }
  }
  return response.data;
};

// Resend account confirmation email
const resendConfirmationEmail = async (email) => {
  const response = await axios.post(`${API_URL}/resend-confirm-email/`, {
    email,
  });

  return response.data;
};

const confirmEmail = async (token) => {
  const response = await axios.get(`${API_URL}/confirm-email/${token}/`);
  return response.data;
};

const refreshAccessToken = async (refreshToken) => {
  const response = await axios.post(`${API_URL}/login/refresh/`, {
    refresh: refreshToken,
  });

  return response.data;
};

const usersService = {
  register,
  logout,
  login,
  resendConfirmationEmail,
  confirmEmail,
  refreshAccessToken,
};

export default usersService;
