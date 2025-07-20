import axios from 'axios';
import { getToken } from '@/utils/auth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to add auth token
api.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Add a response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    // Handle errors like 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Redirect to login or handle token refresh
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;