import { useState } from 'react';
import { AppBar, Toolbar, Box, Typography, IconButton, Tooltip } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import { AppAvatar } from './AppAvatar';
import { ProfileModal } from './ProfileModal';
import { useAuth } from '../auth/useAuth';
import { getFullName } from '../utils/getFullName';

export const NavBar = () => {
  const { user, logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  if (!user) return null;

  const fullName = getFullName(user.firstName, user.lastName);

  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            ReactApp
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Tooltip title="View profile">
              <IconButton onClick={() => setModalOpen(true)} size="small" sx={{ p: 0 }}>
                <AppAvatar name={fullName} />
              </IconButton>
            </Tooltip>

            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                {fullName}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
                @{user.username}
              </Typography>
            </Box>

            <Tooltip title="Logout">
              <IconButton onClick={logout} size="small" color="default" aria-label="logout">
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>

      <ProfileModal open={modalOpen} onClose={() => setModalOpen(false)} user={user} />
    </>
  );
};
