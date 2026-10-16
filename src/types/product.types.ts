import { BaseEntity, ID } from './common.types';
import { Category, Subcategory, Group } from './category.types';

export interface Product extends BaseEntity {
  article: string;
  name: string;
  slug: string;
  categoryId: ID;
  subcategoryId: ID;
  groupId: ID;
  category?: Category;
  subcategory?: Subcategory;
  group?: Group;
  price: number;
  oldPrice?: number;
  isSuperPrice: boolean;
  inStock: boolean;
  stockQuantity: number;
  mainImage: string;
  images: string[];
  shortDescription: string;
  description: string;
  rating: number;
  reviewsCount: number;
  isNew: boolean;
  isHit: boolean;
  bonusPoints: number;
  specifications: Specification[];
  documents?: ProductDocument[];

  compareSpecs?: CompareSpec[];
}

export interface ProductDocument {
  id: string;
  name: string;
  url: string;
  fileName?: string;
  type?: 'pdf' | 'doc' | 'docx' | 'xls' | 'xlsx';
  size?: number;
}

export interface Specification {
  name: string;
  value: string | number | boolean;
  unit?: string;
}

export interface CompareSpec {
  key: string;
  label: string;
  value: string | number | boolean;
  unit?: string;
  group: string;
  order?: number;
}

export interface ProductCard {
  id: string;
  article: string;
  name: string;
  slug: string;
  price: number;
  oldPrice?: number;
  isSuperPrice?: boolean;
  inStock: boolean;
  stockQuantity?: number;
  mainImage: string;
  images?: string[];
  rating?: number;
  reviewsCount?: number;
  groupId: string;
  isNew?: boolean;
  isHit?: boolean;

  description?: string;
  shortDescription?: string;
  bonusPoints?: number;
  specifications?: Specification[];
  tags?: string[];
  compareSpecs?: CompareSpec[];
  categorySlug?: string;
  subcategorySlug?: string;
  groupSlug?: string;
}

export interface ProductFilters {
  groupId?: ID;
  priceMin?: number;
  priceMax?: number;
  inStockOnly?: boolean;
  isSuperPrice?: boolean;
  rating?: number;
  searchQuery?: string;
}
