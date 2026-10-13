import { RouteObject } from 'react-router-dom';
import { ROUTES } from '@/config/routes.config';
import { HomePage } from '@/pages/HomePage';
import { CatalogPage } from '@/pages/CatalogPage';
import { CatalogLevelPage } from '@/pages/CatalogLevelPage/CatalogLevelPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { CartPage } from '@/pages/CartPage';
import { FavoritesPage } from '@/pages/FavoritesPage';
import { ComparePage } from '@/pages/ComparePage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { ProfileOrdersPage } from '@/pages/ProfileOrdersPage';
import { ViewedProductsPage } from '@/pages/ViewedProductsPage';
import { PurchaseHistoryPage } from '@/pages/PurchaseHistoryPage';
import { PrivateRoute } from './PrivateRoute';
import { OrderSuccessPage } from '@/pages/OrderSuccessPage';
import { LoginPage } from '@/pages/LoginPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { SearchPage } from '@/pages/SearchPage';
import { AboutPage } from '@/pages/AboutPage';
import { Layout } from '@/components/layout/Layout';
import { DeliveryPage } from '@/pages/DeliveryPage';
import { PersonPage } from '@/pages/PersonPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.CATALOG, element: <CatalogPage /> },
      { path: ROUTES.CATEGORY, element: <CatalogLevelPage /> },
      { path: ROUTES.SUBCATEGORY, element: <CatalogLevelPage /> },
      { path: ROUTES.GROUP, element: <CatalogLevelPage /> },
      { path: ROUTES.PRODUCT, element: <ProductDetailPage /> },
      { path: ROUTES.CART, element: <CartPage /> },
      { path: ROUTES.FAVORITES, element: <FavoritesPage /> },
      { path: ROUTES.COMPARE, element: <ComparePage /> },
      { path: ROUTES.CHECKOUT, element: <CheckoutPage /> },
      {
        element: <PrivateRoute />,
        children: [
          { path: ROUTES.PROFILE, element: <ProfilePage /> },
          { path: ROUTES.PROFILE_ORDERS, element: <ProfileOrdersPage /> },
          { path: ROUTES.PROFILE_HISTORY, element: <PurchaseHistoryPage /> },
          { path: ROUTES.PROFILE_VIEWED, element: <ViewedProductsPage /> },
        ],
      },
      { path: ROUTES.ORDER_SUCCESS, element: <OrderSuccessPage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.SEARCH, element: <SearchPage /> },
      { path: ROUTES.AboutPage, element: <AboutPage /> },
      { path: ROUTES.DeliveryPage, element: <DeliveryPage /> },
      { path: ROUTES.PersonPage, element: <PersonPage /> },
      { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
