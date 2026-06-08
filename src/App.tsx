import './App.css';

import { Box } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './routes/AppRoutes';
import { NavBar } from './components/NavBar';
import { useAuthInit } from './auth/useAuthInit';

function App() {
  useAuthInit();

  return (
    <BrowserRouter>
      <NavBar />
      <Box sx={{ p: 2 }}>
        <AppRoutes />
      </Box>
    </BrowserRouter>
  );
}

export default App;
