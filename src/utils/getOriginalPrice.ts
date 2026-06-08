import { formatPrice } from './formatPrice';

export const getOriginalPrice = (price: number, discountPercentage: number): string | null => {
  if (discountPercentage <= 0) return null;
  return formatPrice(price / (1 - discountPercentage / 100));
};
