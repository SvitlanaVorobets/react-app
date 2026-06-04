import { Typography } from '@mui/material';
import { PriceRow, Price, DiscountBadge } from './ProductDetails.styles';
import type { ProductDetails } from '../../types/product-details';
import { getFinalPrice } from '../../utils/getFinalPrice';

interface Props {
  product: Pick<ProductDetails, 'price' | 'discountPercentage'>;
}

export const ProductPricing = ({ product }: Props) => {
  const finalPrice = getFinalPrice(product.price, product.discountPercentage);
  const hasDiscount = product.discountPercentage > 0;

  return (
    <PriceRow>
      <Price color="text.primary">${finalPrice.toFixed(2)}</Price>
      {hasDiscount && (
        <>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
          >
            ${product.price.toFixed(2)}
          </Typography>
          <DiscountBadge label={`−${Math.round(product.discountPercentage)}%`} size="small" />
        </>
      )}
    </PriceRow>
  );
};
