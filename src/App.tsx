import './App.css';

import { RadioGroup, FormControlLabel, Radio, FormLabel, Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './routes/AppRoutes';
import { useColorMode } from './theme/useColorMode';
import { LogoutButton } from './components/ui/LogoutButton';

function App() {
  const { mode, setMode } = useColorMode();

  return (
    <BrowserRouter>
      <Box sx={{ p: 2 }}>
        <FormLabel>Theme</FormLabel>
        <RadioGroup row value={mode} onChange={(e) => setMode(e.target.value as 'light' | 'dark')}>
          <FormControlLabel value="light" control={<Radio />} label="Light" />
          <FormControlLabel value="dark" control={<Radio />} label="Dark" />
        </RadioGroup>
        <LogoutButton />

        <AppRoutes />
      </Box>
    </BrowserRouter>
  );
}

export default App;
