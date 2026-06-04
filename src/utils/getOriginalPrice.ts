export const getOriginalPrice = (price: number, discountPercentage: number): string | null => {
  if (discountPercentage <= 0) return null;
  return (price / (1 - discountPercentage / 100)).toFixed(2);
};
