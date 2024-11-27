import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api', // Base API URL
  headers: { 'Content-Type': 'application/json' },
});

export default apiClient;

/*
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export default api;
*/
