import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import { useIsFetching } from '@tanstack/react-query';

import { useAuth } from '../auth/useAuth';
import { ROUTES } from '../routes/routes';
import { storageService } from '../services/storageService';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const isFetching = useIsFetching({ queryKey: ['auth', 'me'] }) > 0;
  const hasToken = !!storageService.getToken();

  if (hasToken && !isAuthenticated && isFetching) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGN_IN} replace />;
  }

  return <>{children}</>;
};
