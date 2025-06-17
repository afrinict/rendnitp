const isDevelopment = process.env.NODE_ENV === 'development';

export const API_BASE_URL = isDevelopment
  ? 'http://localhost:3000'
  : 'https://your-render-backend.onrender.com';

export const API_ENDPOINTS = {
  health: `${API_BASE_URL}/health`,
  status: `${API_BASE_URL}/api/status`,
  data: `${API_BASE_URL}/api/data`,
} as const; 