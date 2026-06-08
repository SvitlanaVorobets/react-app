import axios from 'axios';
import { useFormik } from 'formik';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { AppButton } from '../components/AppButton';
import { FormTextField } from '../components/FormTextField';
import { useSnackbar } from '../providers/useSnackbar';
import { signUpSchema } from '../schemas/baseAuthSchema';
import { ROUTES } from '../routes/routes';

const fakeSignUp = (): Promise<void> => new Promise((resolve) => setTimeout(resolve, 500));

export const SignUp = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const formik = useFormik({
    initialValues: { username: '', password: '' },
    validationSchema: signUpSchema,
    onSubmit: async () => {
      try {
        await fakeSignUp();
        navigate(ROUTES.SIGN_IN);
      } catch (e) {
        const message = axios.isAxiosError(e)
          ? (e.response?.data?.message ?? 'Sign up failed')
          : 'Sign up failed';
        snackbar.show({ message, severity: 'error' });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h5">Sign Up</Typography>
      <FormTextField name="username" label="Username" formik={formik} />
      <FormTextField name="password" label="Password" type="password" formik={formik} />
      <AppButton label="Sign Up" variant="contained" type="submit" disabled={formik.isSubmitting} />
    </form>
  );
};
