import { useAuth } from '../auth/useAuth';
import { AppButton } from './AppButton';

export const LogoutButton = () => {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) return null;

  return <AppButton label="Log out" variant="contained" onClick={logout} />;
};
