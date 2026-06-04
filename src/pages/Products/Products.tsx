import {
  Typography,
  Pagination,
  InputAdornment,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { ProductCard, ProductCardSkeleton } from '../../components/ProductCard';
import { useProducts } from '../../hooks/useProducts';
import { useCategories } from '../../hooks/useCategories';
import { useProductsParams } from '../../hooks/useProductsParams';
import { formatCategory } from '../../utils/formatCategory';
import { PAGE_SIZE } from '../../constants/pagination';
import {
  PageRoot,
  Header,
  PageTitle,
  FilterBar,
  SearchField,
  CategorySelect,
  ActiveFilters,
  FilterChip,
  GridWrapper,
  EmptyState,
  PaginationRow,
} from './Products.styles';

export const Products = () => {
  const { search, category, page, searchInput, setSearchInput, setCategory, clearSearch, setPage } =
    useProductsParams();

  const { data: categories = [] } = useCategories();
  const { data, isLoading, isPlaceholderData } = useProducts(search, category, page);

  const products = data?.products ?? [];
  const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE);
  const hasActiveFilters = !!(search || category);

  return (
    <PageRoot>
      <Header>
        <PageTitle color="text.primary">Products</PageTitle>
        <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
          {isLoading ? 'Loading…' : `${data?.total ?? 0} items found`}
        </Typography>
        <Divider sx={{ mt: 3 }} />
      </Header>

      <FilterBar>
        <SearchField
          placeholder="Search products…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          size="small"
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

        <CategorySelect size="small">
          <InputLabel>Category</InputLabel>
          <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
            <MenuItem value="">All categories</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat} sx={{ textTransform: 'capitalize' }}>
                {formatCategory(cat)}
              </MenuItem>
            ))}
          </Select>
        </CategorySelect>

        {hasActiveFilters && (
          <ActiveFilters>
            {search && (
              <FilterChip
                label={`"${search}"`}
                size="small"
                sx={{ bgcolor: 'action.selected' }}
                onDelete={clearSearch}
              />
            )}
            {category && (
              <FilterChip
                label={formatCategory(category)}
                size="small"
                sx={{ bgcolor: 'action.selected' }}
                onDelete={() => setCategory('')}
              />
            )}
          </ActiveFilters>
        )}
      </FilterBar>

      <GridWrapper dimmed={isPlaceholderData}>
        {!isLoading && products.length === 0 ? (
          <EmptyState>
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
          </EmptyState>
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
      </GridWrapper>

      {totalPages > 1 && (
        <PaginationRow>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, p) => setPage(p)}
            color="primary"
            showFirstButton
            showLastButton
            shape="rounded"
          />
        </PaginationRow>
      )}
    </PageRoot>
  );
};
