import { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import { useAuth } from '../../auth/useAuth';
import { AppButton } from '../ui/AppButton';
import { AppSnackbar } from '../ui/AppSnackbar';

export const SignIn = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await login(credentials);
    } catch (e) {
      setError(e.response?.data?.message ?? 'Invalid credentials');
    }
  };

  return (
    <>
      <Typography variant="h5">Sign In</Typography>
      <TextField
        label="Username"
        onChange={(e) => setCredentials((p) => ({ ...p, username: e.target.value }))}
      />
      <TextField
        label="Password"
        type="password"
        onChange={(e) => setCredentials((p) => ({ ...p, password: e.target.value }))}
      />
      <AppButton label="Sign In" variant="contained" onClick={handleLogin} />

      <AppSnackbar
        open={!!error}
        message={error ?? ''}
        severity="error"
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
};
