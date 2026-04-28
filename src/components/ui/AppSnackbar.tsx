import { Snackbar, Alert, type SnackbarProps } from '@mui/material';

interface AppSnackbarProps extends SnackbarProps {
  message: string;
  severity?: 'success' | 'error' | 'warning' | 'info';
}

export const AppSnackbar = ({
  message,
  severity = 'info',
  autoHideDuration = 3000,
  ...props
}: AppSnackbarProps) => (
  <Snackbar autoHideDuration={autoHideDuration} {...props}>
    <Alert severity={severity} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);