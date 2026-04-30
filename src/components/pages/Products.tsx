import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export const Products = () => (
  <>
    <Typography variant="h5">Products</Typography>
    <ul>
      <li>
        <Link to="/products/1">Product 1</Link>
      </li>
      <li>
        <Link to="/products/2">Product 2</Link>
      </li>
    </ul>
  </>
);
