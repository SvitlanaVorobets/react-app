import { Snackbar, Alert, type SnackbarProps, type AlertColor } from '@mui/material';

interface AppSnackbarProps extends SnackbarProps {
  message: string;
  severity?: AlertColor;
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
