import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { ROUTES } from '../routes/routes';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGN_IN} replace />;
  }

  return <>{children}</>;
};
