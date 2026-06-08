import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { ROUTES } from '../../routes/routes';
import { useProduct } from '../../hooks/useProductDetails';
import { ProductGallery } from './ProductGallery';
import { ProductHeader } from './ProductHeader';
import { ProductPricing } from './ProductPricing';
import { ProductMeta } from './ProductMeta';
import {
  PageRoot,
  Centered,
  NotFound,
  NotFoundTitle,
  BackLink,
  Layout,
} from './ProductDetails.styles';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);
  const { data: product, isLoading } = useProduct(id ?? '');

  if (isLoading) {
    return (
      <Centered>
        <CircularProgress />
      </Centered>
    );
  }

  if (!product) {
    return (
      <NotFound>
        <NotFoundTitle color="text.primary">Product not found</NotFoundTitle>
        <BackLink to={ROUTES.PRODUCTS}>← Back to products</BackLink>
      </NotFound>
    );
  }

  return (
    <PageRoot>
      <BackLink to={ROUTES.PRODUCTS}>
        <ArrowBackIosNewIcon sx={{ fontSize: '0.7rem' }} />
        All Products
      </BackLink>

      <Layout>
        <ProductGallery
          images={product.images}
          thumbnail={product.thumbnail}
          title={product.title}
          activeImage={activeImage}
          onSelect={setActiveImage}
        />

        <div>
          <ProductHeader product={product} />
          <ProductPricing product={product} />
          <ProductMeta product={product} />
        </div>
      </Layout>
    </PageRoot>
  );
};
