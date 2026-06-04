import { useState, useCallback, type ReactNode } from 'react';
import { SnackbarContext, type SnackbarOptions } from './SnackbarContext';
import { AppSnackbar } from '../components/AppSnackbar';

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<SnackbarOptions>({ message: '', severity: 'info' });

  const show = useCallback((opts: SnackbarOptions) => {
    setOptions(opts);
    setOpen(true);
  }, []);

  return (
    <SnackbarContext.Provider value={{ show }}>
      {children}
      <AppSnackbar
        open={open}
        message={options.message}
        severity={options.severity}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </SnackbarContext.Provider>
  );
};
