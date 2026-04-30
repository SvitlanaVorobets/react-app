import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

export const ProductDetails = () => {
  const { id } = useParams();

  return <Typography variant="h5">Product Details for ID: {id}</Typography>;
};
