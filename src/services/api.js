// services/api.js
import axios from 'axios';
import { refreshToken } from '../features/auth/authApi';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = store.getState().auth.refreshToken;
      const { data } = await refreshToken(refreshToken);
      store.dispatch(setCredentials(data));
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);