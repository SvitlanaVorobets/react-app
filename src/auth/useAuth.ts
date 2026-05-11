import { useNavigate } from 'react-router-dom';

import { useUserStore } from '../store/userStore';
import { api } from '../lib/api';

export const useAuth = () => {
  const { user, isAuthenticated, setUser, clearUser } = useUserStore();
  const navigate = useNavigate();

  const login = async (credentials: { username: string; password: string }) => {
    const { data } = await api.post('/auth/login', credentials);
    setUser(data);
    localStorage.setItem('token', data.token);
    navigate('/products');
  };

  const logout = () => {
    clearUser();
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return { user, isAuthenticated, login, logout };
};
