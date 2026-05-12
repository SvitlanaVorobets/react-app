import axios from 'axios';

import { ROUTES } from '../routes/routes';
import { storageService } from '../services/storageService';
import { HTTP_STATUS } from '../constants/httpStatus';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

    const token = storageService.getToken();
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

    if (status === HTTP_STATUS.UNAUTHORIZED) {
      window.location.href = ROUTES.SIGN_IN;
    }

    return Promise.reject(error);
  },
);
