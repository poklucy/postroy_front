import { useCallback, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCategoryHierarchy } from '@/store/slices/categories';
import {
    categoryListKey,
    fetchProductsByCategory,
    fetchProductsByGroup,
    groupListKey,
    mapToProductCard,
} from '@/store/slices/products';
import { selectCurrentHierarchy, selectHierarchyRequest } from '@/store/slices/categories/categories.selectors';
import {
    selectListRequest,
    selectProductsByCategory,
    selectProductsByGroup,
} from '@/store/slices/products/products.selectors';
import { Product, ProductCard } from '@/types/product.types';
import { RequestError } from '@/types/request.types';

const EMPTY_PRODUCTS: Product[] = [];

const notFoundOrNull = (error: RequestError | null) => (error?.kind === 'not_found' ? null : error);

export type CatalogLevel = 'category' | 'subcategory' | 'group';

export const useCatalogContext = () => {
    const { categorySlug, subcategorySlug, groupSlug } = useParams<{
        categorySlug: string;
        subcategorySlug?: string;
        groupSlug?: string;
    }>();
    const dispatch = useAppDispatch();

    const hierarchy = useAppSelector(selectCurrentHierarchy);
    const hierarchyRequest = useAppSelector(selectHierarchyRequest);

    const hierarchyReady = !!hierarchy && hierarchy.slug === categorySlug;
    const hierarchyFailed = !hierarchyReady
        && hierarchyRequest.slug === categorySlug
        && hierarchyRequest.status === 'failed';
    const hierarchyError = hierarchyFailed ? hierarchyRequest.error : null;

    useEffect(() => {
        if (categorySlug && !hierarchyReady && hierarchyRequest.slug !== categorySlug) {
            dispatch(fetchCategoryHierarchy(categorySlug));
        }
    }, [categorySlug, hierarchyReady, hierarchyRequest.slug, dispatch]);

    const retryHierarchy = useCallback(() => {
        if (categorySlug) dispatch(fetchCategoryHierarchy(categorySlug));
    }, [categorySlug, dispatch]);

    const level: CatalogLevel = groupSlug
        ? 'group'
        : subcategorySlug
            ? 'subcategory'
            : 'category';

    const currentSubcategory = useMemo(() => {
        if (!hierarchyReady || !subcategorySlug) return undefined;
        return hierarchy!.subcategories.find(s => s.slug === subcategorySlug);
    }, [hierarchyReady, hierarchy, subcategorySlug]);

    const currentGroup = useMemo(() => {
        if (!currentSubcategory || !groupSlug) return undefined;
        return currentSubcategory.groups?.find(g => g.slug === groupSlug);
    }, [currentSubcategory, groupSlug]);

    const notFound =
        hierarchyError?.kind === 'not_found' ||
        (hierarchyReady && Boolean(subcategorySlug) && !currentSubcategory) ||
        (Boolean(currentSubcategory) && Boolean(groupSlug) && !currentGroup);

    const categoryId = hierarchyReady ? String(hierarchy!.id) : '';
    const groupId = currentGroup?.id ? String(currentGroup.id) : '';

    const productsByCategory = useAppSelector(state =>
        categoryId ? selectProductsByCategory(state, categoryId) : EMPTY_PRODUCTS
    );
    const productsByGroup = useAppSelector(state =>
        groupId ? selectProductsByGroup(state, groupId) : EMPTY_PRODUCTS
    );
    const listKey = level === 'group'
        ? (groupId ? groupListKey(groupId) : '')
        : (categoryId ? categoryListKey(categoryId) : '');
    const productsRequest = useAppSelector(state => selectListRequest(state, listKey));

    const loadProducts = useCallback(() => {
        if (level === 'group' && groupId) {
            dispatch(fetchProductsByGroup({ groupId }));
        } else if (level !== 'group' && categoryId) {
            dispatch(fetchProductsByCategory({ categoryId }));
        }
    }, [level, groupId, categoryId, dispatch]);

    useEffect(loadProducts, [loadProducts]);

    const products = useMemo(() => {
        if (level === 'group') return productsByGroup;
        if (level === 'subcategory' && currentSubcategory) {
            return productsByCategory.filter(
                p => p.subcategoryId === currentSubcategory.id
            );
        }
        return productsByCategory;
    }, [level, productsByGroup, productsByCategory, currentSubcategory]);

    const productCards: ProductCard[] = useMemo(
        () =>
            products.map(p => ({
                ...mapToProductCard(p),
                categorySlug: p.category?.slug || categorySlug || '',
                subcategorySlug: p.subcategory?.slug || subcategorySlug || '',
                groupSlug: p.group?.slug || groupSlug || '',
            })),
        [products, categorySlug, subcategorySlug, groupSlug]
    );

    return {
        level,
        hierarchy,
        hierarchyReady,
        hierarchyError: notFoundOrNull(hierarchyError),
        retryHierarchy,
        notFound,
        categorySlug,
        subcategorySlug,
        groupSlug,
        currentSubcategory,
        currentGroup,
        products: productCards,
        productsLoading: productsRequest.status !== 'succeeded' && productsRequest.status !== 'failed',
        productsError: productsRequest.status === 'failed' ? productsRequest.error : null,
        retryProducts: loadProducts,
    };
};
