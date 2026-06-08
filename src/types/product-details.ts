export type ProductDetails = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  availabilityStatus: string;
  shippingInformation: string;
  returnPolicy: string;
  warrantyInformation: string;
  sku: string;
  tags: string[];
  images: string[];
  thumbnail: string;
};

export const getSpecs = (p: ProductDetails) => [
  { label: 'Rating', value: `${p.rating} / 5` },
  { label: 'Stock', value: String(p.stock) },
  { label: 'SKU', value: p.sku },
  { label: 'Status', value: p.availabilityStatus },
  { label: 'Shipping', value: p.shippingInformation },
  { label: 'Return Policy', value: p.returnPolicy },
  { label: 'Warranty', value: p.warrantyInformation },
];
