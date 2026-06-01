import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';
import type { ProductsResponse } from '../types/products';

export const useProducts = (search: string, category: string, page: number) =>
  useQuery<ProductsResponse>({
    queryKey: ['products', search, category, page],
    queryFn: () => {
      if (search && category)
        return productService.searchByQueryAndCategory(search, category, page);
      if (search) return productService.searchByQuery(search, page);
      if (category) return productService.getByCategory(category, page);
      return productService.getAll(page);
    },
    placeholderData: (prev) => prev,
  });
