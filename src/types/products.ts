export interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  category: string;
  brand?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}

export interface ProductCardProps {
  product: Product;
}
