import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Typography, CircularProgress, Chip, Divider, Rating } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { ROUTES } from '../../../routes/routes';
import styles from './ProductDetails.module.scss';
import { getSpecs } from '../../../types/product-details';
import { formatCategory } from '../../../utils/formatCategory';
import { useProduct } from '../../../hooks/useProductDetails';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);

  const { data: product, isLoading } = useProduct(id);

  if (isLoading) {
    return (
      <Box className={styles.centered}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box className={styles.notFound}>
        <Typography className={styles.notFoundTitle} color="text.primary">
          Product not found
        </Typography>
        <Link to={ROUTES.PRODUCTS} className={styles.backLink}>
          ← Back to products
        </Link>
      </Box>
    );
  }

  const finalPrice = product.price - (product.price * product.discountPercentage) / 100;
  const hasDiscount = product.discountPercentage > 0;

  return (
    <Box className={styles.page}>
      <Link to={ROUTES.PRODUCTS} className={styles.backLink} style={{ color: 'inherit' }}>
        <Box
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            color: 'primary.main',
            fontSize: '0.82rem',
            fontWeight: 500,
            textDecoration: 'none',
            py: '40px 0 32px',
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: '0.7rem' }} />
          All Products
        </Box>
      </Link>

      <Box className={styles.layout}>
        <Box className={styles.gallery}>
          <Box
            component="img"
            src={product.images[activeImage] ?? product.thumbnail}
            alt={product.title}
            className={styles.mainImage}
            sx={{ bgcolor: 'action.hover' }}
          />
          {product.images.length > 1 && (
            <Box className={styles.thumbnails}>
              {product.images.map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  className={`${styles.thumb} ${i === activeImage ? styles.active : ''}`}
                  onClick={() => setActiveImage(i)}
                  loading="lazy"
                  sx={{ bgcolor: 'action.hover' }}
                />
              ))}
            </Box>
          )}
        </Box>

        <Box className={styles.info}>
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

          <Typography className={styles.title} color="text.primary">
            {product.title}
          </Typography>

          {product.brand && (
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2.5 }}>
              by {product.brand}
            </Typography>
          )}

          <Box className={styles.priceRow}>
            <Typography className={styles.price} color="text.primary">
              ${finalPrice.toFixed(2)}
            </Typography>
            {hasDiscount && (
              <>
                <Typography
                  variant="body1"
                  sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
                >
                  ${product.price.toFixed(2)}
                </Typography>
                <Chip
                  label={`−${Math.round(product.discountPercentage)}%`}
                  size="small"
                  className={styles.discountBadge}
                />
              </>
            )}
          </Box>

          <Box className={styles.ratingRow}>
            <Rating value={product.rating} precision={0.1} size="small" readOnly />
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {product.rating} out of 5
            </Typography>
          </Box>

          <Divider sx={{ my: 2.5 }} />

          <Typography className={styles.description} color="text.primary">
            {product.description}
          </Typography>

          <Divider sx={{ my: 2.5 }} />

          <Box className={styles.specsGrid}>
            {getSpecs(product).map(({ label, value }) => (
              <Box key={label} className={styles.specRow}>
                <Typography className={styles.specLabel} sx={{ color: 'text.secondary' }}>
                  {label}
                </Typography>
                <Typography className={styles.specValue} color="text.primary">
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>

          {product.tags.length > 0 && (
            <>
              <Divider sx={{ my: 2.5 }} />
              <Box className={styles.tags}>
                {product.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    className={styles.tag}
                    sx={{ bgcolor: 'action.hover', color: 'text.primary' }}
                  />
                ))}
              </Box>
            </>
          )}

          <Typography className={styles.footer} sx={{ color: 'text.disabled' }}>
            Product ID: {product.id}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
