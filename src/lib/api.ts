import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, {
      params: config.params,
      data: config.data,
    });

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    console.error('[API] Request error', error);
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    console.log(
      `[API] ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`,
      response.data,
    );
    return response;
  },
  (error) => {
    const status = error.response?.status;
    const url = error.config?.url;

    console.error(`[API] ${status} ${url}`, error.response?.data);

    if (status === 401) {
      window.location.href = '/login';
    }

    return Promise.reject(error);
  },
);
