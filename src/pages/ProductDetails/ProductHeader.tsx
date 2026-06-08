import { Typography } from '@mui/material';
import { NotFoundTitle } from './ProductDetails.styles';
import { formatCategory } from '../../utils/formatCategory';
import type { ProductDetails } from '../../types/product-details';

interface Props {
  product: Pick<ProductDetails, 'category' | 'title' | 'brand'>;
}

export const ProductHeader = ({ product }: Props) => (
  <>
    <Typography
      variant="caption"
      sx={{
        color: 'text.secondary',
        textTransform: 'capitalize',
        fontWeight: 500,
        letterSpacing: '0.02em',
        display: 'block',
        mb: 1,
      }}
    >
      {formatCategory(product.category)}
    </Typography>

    <NotFoundTitle color="text.primary">{product.title}</NotFoundTitle>

    {product.brand && (
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5 }}>
        by {product.brand}
      </Typography>
    )}
  </>
);
