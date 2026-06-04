import { Routes, Route, Navigate } from 'react-router-dom';

import { ROUTES } from './routes';
import { ProtectedRoute } from './ProtectedRoute';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Products } from '../pages/Products';
import { ProductDetails } from '../pages/ProductDetails';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.PRODUCTS} replace />} />

      <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
      <Route path={ROUTES.SIGN_UP} element={<SignUp />} />

      <Route
        path={ROUTES.PRODUCTS}
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />

      <Route
        path={ROUTES.PRODUCT_DETAILS}
        element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
