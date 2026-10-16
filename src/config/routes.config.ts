export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog',
  CATEGORY: '/:categorySlug',
  SUBCATEGORY: '/:categorySlug/:subcategorySlug',
  GROUP: '/:categorySlug/:subcategorySlug/:groupSlug',
  PRODUCT: '/:categorySlug/:subcategorySlug/:groupSlug/:productSlug',
  PRODUCT_SHORT: '/product/:productSlug',
  CART: '/cart',
  FAVORITES: '/favorites',
  COMPARE: '/compare',
  CHECKOUT: '/checkout',
  PROFILE: '/profile',
  PROFILE_ORDERS: '/profile/orders',
  PROFILE_HISTORY: '/profile/history',
  PROFILE_VIEWED: '/profile/viewed',
  ORDER_SUCCESS: '/order-success',
  LOGIN: '/login',
  SEARCH: '/search',
  AboutPage: '/about',
  DeliveryPage: '/delivery',
  PersonPage: '/person',
  NOT_FOUND: '/not-found',
};

export const STATIC_PAGE_LABELS: Record<string, string> = {
  cart: 'Корзина',
  favorites: 'Избранное',
  compare: 'Сравнение товаров',
  checkout: 'Оформление заказа',
  profile: 'Профиль',
  orders: 'Мои заказы',
  history: 'История покупок',
  viewed: 'История просмотров',
  'order-success': 'Заказ оформлен',
  login: 'Вход',
  search: 'Поиск',
  about: 'О компании',
  delivery: 'Доставка и оплата',
  person: 'Для юридических лиц',
  'not-found': 'Страница не найдена',
};

export const buildCategoryUrl = (categorySlug: string) => `/${categorySlug}`;
export const buildSubcategoryUrl = (categorySlug: string, subcategorySlug: string) =>
    `/${categorySlug}/${subcategorySlug}`;
export const buildGroupUrl = (categorySlug: string, subcategorySlug: string, groupSlug: string) =>
    `/${categorySlug}/${subcategorySlug}/${groupSlug}`;
export const buildProductUrl = (
    categorySlug: string,
    subcategorySlug: string,
    groupSlug: string,
    productSlug: string
) => `/${categorySlug}/${subcategorySlug}/${groupSlug}/${productSlug}`;
