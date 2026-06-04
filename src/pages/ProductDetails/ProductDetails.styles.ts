import { Box, Typography, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const PageRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
}));

export const Centered = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '60vh',
});

export const NotFound = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  minHeight: '60vh',
  justifyContent: 'center',
}));

export const NotFoundTitle = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 700,
});

export const BackLink = styled(Link)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 4,
  color: theme.palette.primary.main,
  fontSize: '0.82rem',
  fontWeight: 500,
  textDecoration: 'none',
  padding: '40px 0 32px',
}));

export const Layout = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing(6),
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

// Gallery
export const MainImage = styled('img')(({ theme }) => ({
  width: '100%',
  borderRadius: theme.shape.borderRadius,
  objectFit: 'contain',
  aspectRatio: '1',
}));

export const Thumbnails = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1.5),
  flexWrap: 'wrap',
}));

export const Thumb = styled('img', {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ theme, active }) => ({
  width: 64,
  height: 64,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  border: `2px solid ${active ? theme.palette.primary.main : 'transparent'}`,
  opacity: active ? 1 : 0.6,
  transition: 'opacity 0.2s, border-color 0.2s',
  '&:hover': { opacity: 1 },
}));

// Info
export const PriceRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'baseline',
  gap: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
}));

export const Price = styled(Typography)({
  fontSize: '1.75rem',
  fontWeight: 700,
  letterSpacing: '-0.02em',
});

export const DiscountBadge = styled(Chip)(({ theme }) => ({
  backgroundColor: theme.palette.error.light,
  color: theme.palette.error.contrastText,
  fontWeight: 600,
}));

export const RatingRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export const SpecsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  gap: theme.spacing(0.75, 3),
}));

export const SpecLabel = styled(Typography)({
  fontSize: '0.8rem',
  fontWeight: 500,
});

export const SpecValue = styled(Typography)({
  fontSize: '0.8rem',
});

export const Tags = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.75),
}));

export const Footer = styled(Typography)(({ theme }) => ({
  fontSize: '0.72rem',
  marginTop: theme.spacing(3),
}));
