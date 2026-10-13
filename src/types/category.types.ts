import { BaseEntity, ID } from './common.types';

export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  icon?: string;
  order: number;
  isActive: boolean;
}

export interface Subcategory extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  categoryId: ID;
  order: number;
  isActive: boolean;
}

export interface Group extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  subcategoryId: ID | null;
  categoryId: ID;
  order: number;
  isActive: boolean;
}

export interface SubcategoryWithGroups extends Subcategory {
  groups: Group[];
}

export interface CategoryWithHierarchy extends Category {
  subcategories: SubcategoryWithGroups[];
}
