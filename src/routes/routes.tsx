import { Navigate, RouteObject } from 'react-router-dom';
import { ROUTES } from '@/config/routes.config';
import { HomePage } from '@/pages/HomePage';
import { CatalogPage } from '@/pages/CatalogPage';
import { CatalogLevelPage } from '@/pages/CatalogLevelPage/CatalogLevelPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { PrivateRoute } from './PrivateRoute';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { Layout } from '@/components/layout/Layout';
import { ErrorPage, RootErrorPage } from '@/pages/ErrorPage';
import { REDIRECTS } from './redirects';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <RootErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          { path: ROUTES.CATALOG, element: <CatalogPage /> },
          { path: ROUTES.CATEGORY, element: <CatalogLevelPage /> },
          { path: ROUTES.SUBCATEGORY, element: <CatalogLevelPage /> },
          { path: ROUTES.GROUP, element: <CatalogLevelPage /> },
          { path: ROUTES.PRODUCT, element: <ProductDetailPage /> },
          { path: ROUTES.PRODUCT_SHORT, element: <ProductDetailPage /> },
          { path: ROUTES.CART, lazy: () => import('@/pages/CartPage').then(m => ({ Component: m.CartPage })) },
          { path: ROUTES.FAVORITES, lazy: () => import('@/pages/FavoritesPage').then(m => ({ Component: m.FavoritesPage })) },
          { path: ROUTES.COMPARE, lazy: () => import('@/pages/ComparePage').then(m => ({ Component: m.ComparePage })) },
          { path: ROUTES.CHECKOUT, lazy: () => import('@/pages/CheckoutPage').then(m => ({ Component: m.CheckoutPage })) },
          {
            element: <PrivateRoute />,
            children: [
              { path: ROUTES.PROFILE, lazy: () => import('@/pages/ProfilePage').then(m => ({ Component: m.ProfilePage })) },
              { path: ROUTES.PROFILE_ORDERS, lazy: () => import('@/pages/ProfileOrdersPage').then(m => ({ Component: m.ProfileOrdersPage })) },
              { path: ROUTES.PROFILE_HISTORY, lazy: () => import('@/pages/PurchaseHistoryPage').then(m => ({ Component: m.PurchaseHistoryPage })) },
              { path: ROUTES.PROFILE_VIEWED, lazy: () => import('@/pages/ViewedProductsPage').then(m => ({ Component: m.ViewedProductsPage })) },
            ],
          },
          { path: ROUTES.ORDER_SUCCESS, lazy: () => import('@/pages/OrderSuccessPage').then(m => ({ Component: m.OrderSuccessPage })) },
          { path: ROUTES.LOGIN, lazy: () => import('@/pages/LoginPage').then(m => ({ Component: m.LoginPage })) },
          { path: ROUTES.SEARCH, lazy: () => import('@/pages/SearchPage').then(m => ({ Component: m.SearchPage })) },
          { path: ROUTES.AboutPage, lazy: () => import('@/pages/AboutPage').then(m => ({ Component: m.AboutPage })) },
          { path: ROUTES.DeliveryPage, lazy: () => import('@/pages/DeliveryPage').then(m => ({ Component: m.DeliveryPage })) },
          { path: ROUTES.PersonPage, lazy: () => import('@/pages/PersonPage').then(m => ({ Component: m.PersonPage })) },
          ...REDIRECTS.map(({ from, to }) => ({ path: from, element: <Navigate to={to} replace /> })),
          { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
];
