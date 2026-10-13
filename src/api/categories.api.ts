import { Category, CategoryWithHierarchy } from '@/types/category.types';
import { delay } from '@/utils/helpers';
import { mockCategories, mockCategoryHierarchy } from './mockData/categories';

export const categoriesApi = {
  getAll: async (): Promise<Category[]> => {
    await delay(300);
    return mockCategories;
  },

  getBySlug: async (slug: string): Promise<Category> => {
    await delay(200);
    const category = mockCategories.find(c => c.slug === slug);
    if (!category) throw new Error('Category not found');
    return category;
  },

  getAllWithHierarchy: async (): Promise<CategoryWithHierarchy[]> => {
    await delay(300);
    return Object.values(mockCategoryHierarchy);
  },

  getHierarchy: async (slug: string): Promise<CategoryWithHierarchy> => {
    await delay(300);
    const hierarchy = mockCategoryHierarchy[slug];
    if (!hierarchy) throw new Error('Category hierarchy not found');
    return hierarchy;
  },
};
