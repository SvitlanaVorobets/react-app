import axios from 'axios';
import { useState } from 'react';
import { useFormik } from 'formik';
import { TextField, Typography } from '@mui/material';

import { useAuth } from '../../auth/useAuth';
import { AppButton } from '../ui/AppButton';
import { AppSnackbar } from '../ui/AppSnackbar';
import { signInSchema } from '../../schemas/signInSchema';

export const SignIn = () => {
  const { login, isPending } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      try {
        await login(values);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e.response?.data?.message ?? 'Invalid credentials');
        } else {
          setError('Invalid credentials');
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h5">Sign In</Typography>
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
      <AppButton
        label="Sign In"
        variant="contained"
        type="submit"
        disabled={formik.isSubmitting || isPending}
      />

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
