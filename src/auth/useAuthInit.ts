import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import { useUserStore } from '../store/userStore';
import { api } from '../lib/api';
import { storageService } from '../services/storageService';

export const useAuthInit = () => {
  const setUser = useUserStore((state) => state.setUser);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const { data, isSuccess } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const { data } = await api.get('/auth/me');
      return data;
    },
    enabled: !!storageService.getToken() && !isAuthenticated,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [isSuccess, data, setUser]);
};
