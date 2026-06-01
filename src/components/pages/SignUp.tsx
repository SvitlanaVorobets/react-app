import axios from 'axios';
import { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppButton } from '../ui/AppButton';
import { AppSnackbar } from '../ui/AppSnackbar';
import { signUpSchema } from '../../schemas/signUpSchema';
import { ROUTES } from '../../routes/routes';

const fakeSignUp = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 500));

export const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: signUpSchema,
    onSubmit: async () => {
      try {
        await fakeSignUp();
        navigate(ROUTES.SIGN_IN);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e.response?.data?.message ?? 'Sign up failed');
        } else {
          setError('Sign up failed');
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h5">Sign Up</Typography>

      <TextField
        label="Username"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username && !!formik.errors.username}
        helperText={formik.touched.username && formik.errors.username}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && !!formik.errors.password}
        helperText={formik.touched.password && formik.errors.password}
      />

      <AppButton label="Sign Up" variant="contained" type="submit" disabled={formik.isSubmitting} />

      <AppSnackbar
        open={!!error}
        message={error ?? ''}
        severity="error"
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </form>
  );
};
