import { api } from '../lib/api';
import type { ProductDetails } from '../types/product-details';

export const productService = {
  getById: async (id: string): Promise<ProductDetails> => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },
};
