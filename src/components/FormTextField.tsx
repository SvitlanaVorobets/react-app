import { TextField } from '@mui/material';
import type { FormikProps } from 'formik';

interface Props {
  name: string;
  label: string;
  type?: string;
  formik: FormikProps<{ username: string; password: string }>;
}

export const FormTextField = ({ name, label, type = 'text', formik }: Props) => (
  <TextField
    label={label}
    name={name}
    type={type}
    value={formik.values[name as keyof typeof formik.values]}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={
      formik.touched[name as keyof typeof formik.touched] &&
      !!formik.errors[name as keyof typeof formik.errors]
    }
    helperText={
      formik.touched[name as keyof typeof formik.touched] &&
      formik.errors[name as keyof typeof formik.errors]
    }
  />
);
