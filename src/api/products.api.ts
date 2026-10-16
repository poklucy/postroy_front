import { Product, ProductFilters } from '@/types/product.types';
import { ApiError } from './apiError';
import { fetchJson } from './http';
import { mockRequest } from './mock';
import { mockProducts, getProductsByGroupId, getProductBySlug, getRelatedProducts } from './mockData/products';

const USE_MOCK = true;

const applyFilters = (products: Product[], filters?: ProductFilters): Product[] => {
  if (!filters) return products;

  const { inStockOnly, isSuperPrice, priceMin, priceMax } = filters;

  return products.filter(p =>
      (!inStockOnly || p.inStock) &&
      (!isSuperPrice || p.isSuperPrice) &&
      (priceMin === undefined || p.price >= priceMin) &&
      (priceMax === undefined || p.price <= priceMax)
  );
};

export const productsApi = {
  getByGroup: async (groupId: string, filters?: ProductFilters): Promise<Product[]> => {
    if (USE_MOCK) {
      return mockRequest('products', 400, () => applyFilters(getProductsByGroupId(groupId), filters));
    }
    return fetchJson(`/api/products/group/${groupId}`);
  },

  getByCategory: async (categoryId: string, filters?: ProductFilters): Promise<Product[]> => {
    if (USE_MOCK) {
      return mockRequest('products', 300, () =>
          applyFilters(mockProducts.filter(p => p.categoryId === categoryId), filters)
      );
    }
    return fetchJson(`/api/products/category/${categoryId}`);
  },

  getBySlug: async (slug: string): Promise<Product> => {
    if (USE_MOCK) {
      return mockRequest('product', 300, () => {
        const product = getProductBySlug(slug);
        if (!product) throw new ApiError('not_found', `Product "${slug}" not found`, 404);
        return product;
      });
    }
    return fetchJson(`/api/products/slug/${slug}`);
  },

  getById: async (id: string): Promise<Product> => {
    if (USE_MOCK) {
      return mockRequest('product', 300, () => {
        const product = mockProducts.find(p => p.id === id);
        if (!product) throw new ApiError('not_found', `Product "${id}" not found`, 404);
        return product;
      });
    }
    return fetchJson(`/api/products/${id}`);
  },

  getRelated: async (productId: string, limit: number = 4): Promise<Product[]> => {
    if (USE_MOCK) {
      return mockRequest('related', 200, () => getRelatedProducts(productId, limit));
    }
    return fetchJson(`/api/products/${productId}/related?limit=${limit}`);
  },

  search: async (query: string): Promise<Product[]> => {
    if (USE_MOCK) {
      return mockRequest('search', 500, () => {
        const lowerQuery = query.toLowerCase();
        return mockProducts.filter(p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.article.includes(query) ||
            p.description.toLowerCase().includes(lowerQuery)
        );
      });
    }
    return fetchJson(`/api/products/search?q=${encodeURIComponent(query)}`);
  },
};
