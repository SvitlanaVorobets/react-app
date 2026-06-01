import { useQuery } from '@tanstack/react-query';
import { productService } from '../services/productDetailsService';

export const useProduct = (id: string | undefined) =>
  useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getById(id!),
    enabled: !!id,
  });
