export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
  },
  categories: {
    all: '/categories',
    byId: (id: string) => `/categories/${id}`,
    bySlug: (slug: string) => `/categories/slug/${slug}`,
  },
  subcategories: {
    byCategory: (categoryId: string) => `/subcategories/category/${categoryId}`,
    bySlug: (slug: string) => `/subcategories/slug/${slug}`,
  },
  groups: {
    bySubcategory: (subcategoryId: string) => `/groups/subcategory/${subcategoryId}`,
    bySlug: (slug: string) => `/groups/slug/${slug}`,
  },
  products: {
    all: '/products',
    byId: (id: string) => `/products/${id}`,
    bySlug: (slug: string) => `/products/slug/${slug}`,
    byGroup: (groupId: string) => `/products/group/${groupId}`,
    search: '/products/search',
  },
  cart: {
    get: '/cart',
    add: '/cart/add',
    update: '/cart/update',
    remove: '/cart/remove',
    clear: '/cart/clear',
  },
  orders: {
    all: '/orders',
    byId: (id: string) => `/orders/${id}`,
    create: '/orders',
  },
  user: {
    profile: '/user/profile',
    update: '/user/profile',
    addresses: '/user/addresses',
  },
} as const;
