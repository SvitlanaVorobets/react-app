import { PAGE_SIZE } from '../constants/pagination';
import { api } from '../lib/api';
import type { Product, ProductsResponse } from '../types/products';
import type { ProductDetails } from '../types/product-details';

class ProductService {
  async getById(id: string): Promise<ProductDetails> {
    const { data } = await api.get(`/products/${id}`);
    return data;
  }

  async getCategories(): Promise<string[]> {
    const { data } = await api.get('/products/category-list');
    return data;
  }

  async getAll(page: number): Promise<ProductsResponse> {
    const skip = (page - 1) * PAGE_SIZE;
    const { data } = await api.get('/products', { params: { limit: PAGE_SIZE, skip } });
    return data;
  }

  async searchByQuery(search: string, page: number): Promise<ProductsResponse> {
    const skip = (page - 1) * PAGE_SIZE;
    const { data } = await api.get('/products/search', {
      params: { q: search, limit: PAGE_SIZE, skip },
    });
    return data;
  }

  async getByCategory(category: string, page: number): Promise<ProductsResponse> {
    const skip = (page - 1) * PAGE_SIZE;
    const { data } = await api.get(`/products/category/${category}`, {
      params: { limit: PAGE_SIZE, skip },
    });
    return data;
  }

  // DummyJSON has no combined search+category endpoint — fetch all in category, filter client-side
  async searchByQueryAndCategory(
    search: string,
    category: string,
    page: number,
  ): Promise<ProductsResponse> {
    const skip = (page - 1) * PAGE_SIZE;
    const { data } = await api.get(`/products/category/${category}`, { params: { limit: 0 } });
    const filtered = (data.products as Product[]).filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase()),
    );
    return { products: filtered.slice(skip, skip + PAGE_SIZE), total: filtered.length };
  }
}

export const productService = new ProductService();
