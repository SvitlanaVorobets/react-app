import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productService';

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
    staleTime: Infinity,
    select: (data) => data ?? [],
  });
