import { Skeleton, Box } from '@mui/material';

export const ProductCardSkeleton = () => (
  <Box sx={{ bgcolor: 'action.hover', borderRadius: '20px', overflow: 'hidden' }}>
    <Skeleton variant="rectangular" height={220} sx={{ bgcolor: 'action.selected' }} />
    <Box sx={{ p: '4px 20px 22px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Skeleton variant="text" width={60} sx={{ fontSize: '0.7rem' }} />
      <Skeleton variant="text" sx={{ fontSize: '0.95rem' }} />
      <Skeleton variant="text" width="65%" sx={{ fontSize: '0.95rem' }} />
      <Skeleton variant="text" width={80} sx={{ fontSize: '0.7rem', mt: '4px' }} />
      <Skeleton variant="text" width={60} sx={{ fontSize: '1rem', mt: '6px' }} />
    </Box>
  </Box>
);
