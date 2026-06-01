import { Box, Typography } from '@mui/material';
import type { ProfileRowProps } from '../../types/user';

export const ProfileRow = ({ label, value }: ProfileRowProps) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>
      {value}
    </Typography>
  </Box>
);
