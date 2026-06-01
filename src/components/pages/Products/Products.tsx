import {
  Box,
  Typography,
  TextField,
  Chip,
  Pagination,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import clsx from 'clsx';

import { ProductCard, ProductCardSkeleton } from '../../ui/ProductCard';
import { useProducts } from '../../../hooks/useProducts';
import { useCategories } from '../../../hooks/useCategories';
import { useProductsParams } from '../../../hooks/useProductsParams';
import { formatCategory } from '../../../utils/formatCategory';
import styles from './Products.module.scss';
import { PAGE_SIZE } from '../../../constants/pagination';

export const Products = () => {
  const { search, category, page, searchInput, setSearchInput, setCategory, clearSearch, setPage } =
    useProductsParams();

  const { data: categories = [] } = useCategories();
  const { data, isLoading, isPlaceholderData } = useProducts(search, category, page);

  const products = data?.products ?? [];
  const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE);
  const hasActiveFilters = !!(search || category);

  return (
    <Box className={styles.page}>
      <Box className={styles.header}>
        <Typography className={styles.pageTitle} color="text.primary">
          Products
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          {isLoading ? 'Loading…' : `${data?.total ?? 0} items found`}
        </Typography>
        <Divider sx={{ mt: 3 }} />
      </Box>

      <Box className={styles.filterBar}>
        <TextField
          placeholder="Search products…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          size="small"
          className={styles.searchField}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControl size="small" sx={{ minWidth: 180 }}>
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="">All categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat} sx={{ textTransform: 'capitalize' }}>
                {formatCategory(cat)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {hasActiveFilters && (
          <Box className={styles.activeFilters}>
            {search && (
              <Chip
                label={`"${search}"`}
                size="small"
                className={styles.filterChip}
                sx={{ bgcolor: 'action.selected' }}
                onDelete={clearSearch}
              />
            )}
            {category && (
              <Chip
                label={formatCategory(category)}
                size="small"
                className={styles.filterChip}
                sx={{ bgcolor: 'action.selected' }}
                onDelete={() => setCategory('')}
              />
            )}
          </Box>
        )}
      </Box>

      <Box className={clsx(styles.gridWrapper, isPlaceholderData && styles.dimmed)}>
        {!isLoading && products.length === 0 ? (
          <Box className={styles.emptyState}>
            <Typography
              variant="h6"
              color="text.primary"
              sx={{ fontWeight: 600, letterSpacing: '-0.02em' }}
            >
              No products found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your search or filters
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={2}>
            {isLoading
              ? Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <ProductCardSkeleton />
                  </Grid>
                ))
              : products.map((product) => (
                  <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
          </Grid>
        )}
      </Box>

      {totalPages > 1 && (
        <Box className={styles.paginationRow}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, p) => setPage(p)}
            color="primary"
            showFirstButton
            showLastButton
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
};
