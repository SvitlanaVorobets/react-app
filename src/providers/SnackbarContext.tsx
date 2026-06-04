import { createContext } from 'react';
import type { AlertColor } from '@mui/material';

export interface SnackbarOptions {
  message: string;
  severity?: AlertColor;
}

export interface SnackbarContextValue {
  show: (options: SnackbarOptions) => void;
}

export const SnackbarContext = createContext<SnackbarContextValue | null>(null);
