export const ROUTES = {
  ROOT: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/products/:id',
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
