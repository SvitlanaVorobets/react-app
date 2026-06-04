import { Box, Typography, TextField, Chip, FormControl } from '@mui/material';
import { styled } from '@mui/material/styles';

export const PageRoot = styled(Box)({
  maxWidth: 1200,
  margin: '0 auto',
  padding: '0 0 80px',
});

export const Header = styled(Box)({
  padding: '56px 0 36px',
  marginBottom: 36,
});

export const PageTitle = styled(Typography)({
  fontSize: '3rem !important',
  fontWeight: '700 !important',
  letterSpacing: '-0.04em !important',
  lineHeight: '1 !important',
});

export const FilterBar = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  flexWrap: 'wrap',
  marginBottom: 32,
});

export const SearchField = styled(TextField)({
  minWidth: 240,
  flex: 1,
  maxWidth: 360,
  '& .MuiOutlinedInput-root': {
    borderRadius: 980,
    fontSize: '0.875rem',
  },
});

export const CategorySelect = styled(FormControl)({
  minWidth: 180,
  '& .MuiOutlinedInput-root': {
    borderRadius: 980,
    fontSize: '0.875rem',
  },
  '& .MuiInputLabel-root': {
    fontSize: '0.875rem',
  },
});

export const ActiveFilters = styled(Box)({
  display: 'flex',
  gap: 6,
  alignItems: 'center',
  flexWrap: 'wrap',
  marginLeft: 'auto',
});

export const FilterChip = styled(Chip)({
  textTransform: 'capitalize',
  fontSize: '0.72rem !important',
  borderRadius: '980px !important',
  border: 'none !important',
  fontWeight: '500 !important',
});

export const GridWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'dimmed',
})<{ dimmed?: boolean }>(({ dimmed }) => ({
  transition: 'opacity 0.25s ease',
  ...(dimmed && {
    opacity: 0.45,
    pointerEvents: 'none',
  }),
}));

export const EmptyState = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '100px 24px',
  textAlign: 'center',
  gap: 10,
});

export const PaginationRow = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  marginTop: 56,
  '& .MuiPaginationItem-root': {
    borderRadius: 980,
    fontSize: '0.875rem',
    fontWeight: 500,
  },
});
