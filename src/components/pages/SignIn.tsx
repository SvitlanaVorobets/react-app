import { Typography } from '@mui/material';
import { useAuth } from '../../auth/useAuth';
import { useNavigate } from 'react-router-dom';
import { AppButton } from '../ui/AppButton';

export const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate('/products');
  };

  return (
    <>
      <Typography variant="h5">Sign In</Typography>
      <AppButton label="Mock Login" variant="contained" onClick={handleLogin}></AppButton>
    </>
  );
};
