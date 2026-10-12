import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
        localStorage.removeItem('token');
        alert('Your admin session has expired. Please log in again.');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const getServerUrl = () => {
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  return apiUrl.replace(/\/api\/?$/, '');
};

export const getImageUrl = (url?: string) => {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const base = getServerUrl();
  const cleanUrl = url.startsWith('/') ? url : `/${url}`;
  return `${base}${cleanUrl}`;
};

export default api;
