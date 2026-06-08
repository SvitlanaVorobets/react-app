import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Chip, Typography, Rating, Box } from '@mui/material';

import styles from './ProductCard.module.scss';
import { formatCategory } from '../../utils/formatCategory';
import type { ProductCardProps } from '../../types/products';
import { getOriginalPrice } from '../../utils/getOriginalPrice';
import { formatPrice } from '../../utils/formatPrice';

export const ProductCard = ({ product }: ProductCardProps) => {
  const originalPrice = getOriginalPrice(product.price, product.discountPercentage);

  return (
    <Card className={styles.card} elevation={0} sx={{ bgcolor: 'action.hover' }}>
      <CardActionArea component={Link} to={`/products/${product.id}`} className={styles.actionArea}>
        <Box className={styles.imageWrapper} sx={{ bgcolor: 'action.hover' }}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className={styles.image}
            loading="lazy"
          />
          {product.discountPercentage > 0 && (
            <Chip
              label={`−${Math.round(product.discountPercentage)}%`}
              size="small"
              className={styles.discountBadge}
            />
          )}
        </Box>

        <CardContent className={styles.content}>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              textTransform: 'capitalize',
              fontWeight: 500,
              letterSpacing: '0.02em',
            }}
          >
            {formatCategory(product.category)}
          </Typography>

          <Typography className={styles.title} color="text.primary">
            {product.title}
          </Typography>

          {product.brand && (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {product.brand}
            </Typography>
          )}

          <Box className={styles.ratingRow}>
            <Rating value={product.rating} precision={0.1} size="small" readOnly />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              ({product.rating})
            </Typography>
          </Box>

          <Box className={styles.priceRow}>
            <Typography className={styles.price} color="text.primary">
              {formatPrice(product.price)}
            </Typography>
            {originalPrice && (
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
              >
                ${originalPrice}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
