// axios.js
import axios from 'axios';
import { store } from './app/store'; // Adjust the path to your store
import { logout, refreshAccessToken } from './features/users/usersSlice';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.users.accessToken;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const state = store.getState();
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newToken = await store.dispatch(refreshAccessToken()).unwrap();
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newToken.access}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken.access}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        store.dispatch(logout());
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
