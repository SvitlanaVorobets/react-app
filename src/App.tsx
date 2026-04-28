import './App.css';
import { useColorMode } from './theme/ThemeProvider';
import { RadioGroup, FormControlLabel, Radio, FormLabel, Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './auth/AuthContext';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  const { mode, setMode } = useColorMode();

  return (
    <AuthProvider>
      <BrowserRouter>
        <Box sx={{ p: 2 }}>
          <FormLabel>Theme</FormLabel>
          <RadioGroup
            row
            value={mode}
            onChange={(e) => setMode(e.target.value as 'light' | 'dark')}
          >
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          </RadioGroup>

          <AppRoutes />
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;