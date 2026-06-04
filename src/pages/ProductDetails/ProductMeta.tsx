import { Typography, Divider, Rating, Chip } from '@mui/material';
import { RatingRow, SpecsGrid, SpecLabel, SpecValue, Tags, Footer } from './ProductDetails.styles';
import { getSpecs } from '../../types/product-details';
import type { ProductDetails } from '../../types/product-details';

interface Props {
  product: ProductDetails;
}

export const ProductMeta = ({ product }: Props) => (
  <>
    <RatingRow>
      <Rating value={product.rating} precision={0.1} size="small" readOnly />
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        {product.rating} out of 5
      </Typography>
    </RatingRow>

    <Divider sx={{ my: 2.5 }} />

    <Typography variant="body2" color="text.primary">
      {product.description}
    </Typography>

    <Divider sx={{ my: 2.5 }} />

    <SpecsGrid>
      {getSpecs(product).map(({ label, value }) => (
        <>
          <SpecLabel key={`${label}-label`} sx={{ color: 'text.secondary' }}>
            {label}
          </SpecLabel>
          <SpecValue key={`${label}-value`} color="text.primary">
            {value}
          </SpecValue>
        </>
      ))}
    </SpecsGrid>

    {product.tags.length > 0 && (
      <>
        <Divider sx={{ my: 2.5 }} />
        <Tags>
          {product.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ bgcolor: 'action.hover', color: 'text.primary' }}
            />
          ))}
        </Tags>
      </>
    )}

    <Footer sx={{ color: 'text.disabled' }}>Product ID: {product.id}</Footer>
  </>
);
