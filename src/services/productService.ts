import { PAGE_SIZE } from '../constants/pagination';
import { api } from '../lib/api';
import type { Product } from '../types/products';
import type { ProductsResponse } from '../types/products';

export const productService = {
  getById: async (id: string): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  getCategories: async (): Promise<string[]> => {
    const { data } = await api.get('/products/category-list');
    return data;
  },

  getAll: async (page: number): Promise<ProductsResponse> => {
    const skip = (page - 1) * PAGE_SIZE;
    const { data } = await api.get('/products', { params: { limit: PAGE_SIZE, skip } });
    return data;
  },

  searchByQuery: async (search: string, page: number): Promise<ProductsResponse> => {
    const skip = (page - 1) * PAGE_SIZE;
    const { data } = await api.get('/products/search', {
      params: { q: search, limit: PAGE_SIZE, skip },
    });
    return data;
  },

  getByCategory: async (category: string, page: number): Promise<ProductsResponse> => {
    const skip = (page - 1) * PAGE_SIZE;
    const { data } = await api.get(`/products/category/${category}`, {
      params: { limit: PAGE_SIZE, skip },
    });
    return data;
  },

  // DummyJSON has no combined search+category endpoint — fetch all in category, filter client-side
  searchByQueryAndCategory: async (
    search: string,
    category: string,
    page: number,
  ): Promise<ProductsResponse> => {
    const skip = (page - 1) * PAGE_SIZE;
    const { data } = await api.get(`/products/category/${category}`, { params: { limit: 0 } });
    const filtered = (data.products as Product[]).filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()),
    );
    return { products: filtered.slice(skip, skip + PAGE_SIZE), total: filtered.length };
  },
};
