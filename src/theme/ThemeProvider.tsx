import { createTheme, ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { createContext, useContext, useState, useMemo } from 'react';

const ColorModeContext = createContext({ 
    mode: 'light' as 'light' | 'dark',
    toggle: () => {},
    setMode: (_: 'light' | 'dark') => {}, 
});
export const useColorMode = () => useContext(ColorModeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const colorMode = useMemo(() => ({
        mode,
        toggle: () => setMode(prev => prev === 'light' ? 'dark' : 'light'),
        setMode,
    }), [mode]);

    const theme = useMemo(() => createTheme({
        palette: {
            mode,
            ...(mode === 'light'
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
                }
            ),
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
    }), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ColorModeContext.Provider>
    );
};