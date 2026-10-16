import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { mockProducts } from '@/api/mockData/products';
import { Product, ProductCard } from '@/types/product.types';
import { IDLE_REQUEST, RequestState } from '@/types/request.types';

const EMPTY_PRODUCTS: Product[] = [];

export const selectProductsState = (state: RootState) => state.products;

export const selectProductsByGroup = createSelector(
    [selectProductsState, (_: RootState, groupId: string) => groupId],
    (productsState, groupId) => productsState.byGroup[groupId] ?? EMPTY_PRODUCTS
);

export const selectProductsByCategory = createSelector(
    [selectProductsState, (_: RootState, categoryId: string) => categoryId],
    (productsState, categoryId) => productsState.byCategory[categoryId] ?? EMPTY_PRODUCTS
);

export const selectCurrentProduct = createSelector(
    [selectProductsState],
    (productsState) => productsState.currentProduct
);

export const selectProductRequest = (state: RootState) => state.products.productRequest;

export const selectRelatedProducts = createSelector(
    [selectProductsState],
    (productsState) => productsState.relatedProducts
);

export const selectListRequest = (state: RootState, key: string): RequestState =>
    state.products.listRequests[key] ?? IDLE_REQUEST;

export const selectSearchRequest = (state: RootState) => state.products.searchRequest;

export const selectSearchResults = createSelector(
    [selectProductsState],
    (productsState) => productsState.searchResults
);

export const mapToProductCard = (product: Product): ProductCard => ({
    id: product.id as string,
    article: product.article,
    name: product.name,
    slug: product.slug,
    price: product.price,
    oldPrice: product.oldPrice,
    isSuperPrice: product.isSuperPrice,
    inStock: product.inStock,
    stockQuantity: product.stockQuantity,
    mainImage: product.mainImage,
    images: product.images,
    rating: product.rating,
    reviewsCount: product.reviewsCount,
    groupId: product.groupId as string,
    isNew: product.isNew,
    isHit: product.isHit,

    description: product.description,
    shortDescription: product.shortDescription,
    bonusPoints: product.bonusPoints,
    specifications: product.specifications,
    compareSpecs: product.compareSpecs,

    categorySlug: product.category?.slug || '',
    subcategorySlug: product.subcategory?.slug || '',
    groupSlug: product.group?.slug || '',
});

const PREVIEW_LIMIT = 8;

const pickProductCards = (predicate: (product: Product) => boolean): ProductCard[] =>
    mockProducts.filter(predicate).slice(0, PREVIEW_LIMIT).map(mapToProductCard);

const recommendedProducts = pickProductCards(p => p.isSuperPrice || p.isHit);
const hitProducts = pickProductCards(p => p.isHit);

export const selectRecommendedProducts = () => recommendedProducts;

export const selectHitProducts = () => hitProducts;
