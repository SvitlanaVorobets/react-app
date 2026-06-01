import {
  Box,
  Typography,
  Divider,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@mui/material';

import { AppModal } from './AppModal';
import { AppAvatar } from './AppAvatar';
import { ProfileRow } from './Profilerow';
import { useColorMode } from '../../theme/useColorMode';
import type { ProfileModalProps } from '../../types/user';

export const ProfileModal = ({ open, onClose, user }: ProfileModalProps) => {
  const { mode, setMode } = useColorMode();
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <AppModal open={open} onClose={onClose} title="Profile">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 2 }}>
        <AppAvatar name={fullName} sx={{ width: 64, height: 64, fontSize: 28 }} />
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {fullName}
        </Typography>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2 }}>
        <ProfileRow label="Username" value={`@${user.username}`} />
        <ProfileRow label="Email" value={user.email} />
        <ProfileRow label="First name" value={user.firstName} />
        <ProfileRow label="Last name" value={user.lastName} />
      </Box>

      <FormLabel>Theme</FormLabel>
      <RadioGroup row value={mode} onChange={(e) => setMode(e.target.value as 'light' | 'dark')}>
        <FormControlLabel value="light" control={<Radio />} label="Light" />
        <FormControlLabel value="dark" control={<Radio />} label="Dark" />
      </RadioGroup>
    </AppModal>
  );
};
