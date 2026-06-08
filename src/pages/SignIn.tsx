import axios from 'axios';
import { useFormik } from 'formik';
import { Typography } from '@mui/material';

import { useAuth } from '../auth/useAuth';
import { AppButton } from '../components/AppButton';
import { FormTextField } from '../components/FormTextField';
import { useSnackbar } from '../providers/useSnackbar';
import { signInSchema } from '../schemas/baseAuthSchema';

export const SignIn = () => {
  const { login, isPending } = useAuth();
  const snackbar = useSnackbar();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: signInSchema,
    onSubmit: async (values) => {
      try {
        await login(values);
      } catch (e) {
        const message = axios.isAxiosError(e)
          ? (e.response?.data?.message ?? 'Invalid credentials')
          : 'Invalid credentials';
        snackbar.show({ message, severity: 'error' });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h5">Sign In</Typography>
      <FormTextField name="username" label="Username" formik={formik} />
      <FormTextField name="password" label="Password" type="password" formik={formik} />
      <AppButton
        label="Sign In"
        variant="contained"
        type="submit"
        disabled={formik.isSubmitting || isPending}
      />
    </form>
  );
};
