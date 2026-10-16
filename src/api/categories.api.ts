import { Category, CategoryWithHierarchy } from '@/types/category.types';
import { ApiError } from './apiError';
import { mockRequest } from './mock';
import { mockCategories, mockCategoryHierarchy } from './mockData/categories';

export const categoriesApi = {
  getAll: (): Promise<Category[]> => mockRequest('catalog', 300, () => mockCategories),

  getBySlug: (slug: string): Promise<Category> =>
      mockRequest('category', 200, () => {
        const category = mockCategories.find(c => c.slug === slug);
        if (!category) throw new ApiError('not_found', `Category "${slug}" not found`, 404);
        return category;
      }),

  getAllWithHierarchy: (): Promise<CategoryWithHierarchy[]> =>
      mockRequest('catalog', 300, () => Object.values(mockCategoryHierarchy)),

  getHierarchy: (slug: string): Promise<CategoryWithHierarchy> =>
      mockRequest('category', 300, () => {
        const hierarchy = mockCategoryHierarchy[slug];
        if (!hierarchy) throw new ApiError('not_found', `Category "${slug}" not found`, 404);
        return hierarchy;
      }),
};
