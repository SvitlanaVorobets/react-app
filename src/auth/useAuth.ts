import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { useUserStore } from '../store/userStore';
import { api } from '../lib/api';
import { storageService } from '../services/storageService';
import { ROUTES } from '../routes/routes';
import type { LoginCredentials } from '../types/auth';

export const useAuth = () => {
  const { user, isAuthenticated, setUser, clearUser } = useUserStore();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      setUser(data);
      storageService.setToken(data.token);
      navigate(ROUTES.PRODUCTS);
    },
  });

  const logout = () => {
    clearUser();
    storageService.removeToken();
    navigate(ROUTES.SIGN_IN);
  };

  return {
    user,
    isAuthenticated,
    login: loginMutation.mutateAsync,
    isPending: loginMutation.isPending,
    logout,
  };
};
