import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { useState, useMemo } from 'react';

import { Theme } from './theme';
import { ColorModeContext } from './ColorModeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [mode, setMode] = useState<Theme>(Theme.LIGHT);

  const colorMode = useMemo(
    () => ({
      mode,
      toggle: () => setMode((prev) => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)),
      setMode,
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === Theme.LIGHT
            ? {
                primary: { main: '#6366f1', light: '#818cf8', dark: '#4338ca' },
                secondary: { main: '#f43f5e', light: '#fb7185', dark: '#e11d48' },
                background: { default: '#f8fafc', paper: '#ffffff' },
                text: { primary: '#0f172a', secondary: '#64748b' },
              }
            : {
                primary: { main: '#818cf8', light: '#a5b4fc', dark: '#6366f1' },
                secondary: { main: '#fb7185', light: '#fda4af', dark: '#f43f5e' },
                background: { default: '#0f172a', paper: '#1e293b' },
                text: { primary: '#f1f5f9', secondary: '#94a3b8' },
              }),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", sans-serif',
          h1: { fontWeight: 700 },
          h2: { fontWeight: 600 },
          button: { textTransform: 'none' },
        },
        shape: {
          borderRadius: 10,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};
