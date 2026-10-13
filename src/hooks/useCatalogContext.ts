import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchCategoryHierarchy } from '@/store/slices/categories';
import { fetchProductsByCategory, fetchProductsByGroup, mapToProductCard } from '@/store/slices/products';
import {
    selectCurrentHierarchy,
    selectHierarchyLoading,
} from '@/store/slices/categories/categories.selectors';
import {
    selectProductsByCategory,
    selectProductsByGroup,
    selectProductsLoading,
} from '@/store/slices/products/products.selectors';
import { ProductCard } from '@/types/product.types';

export type CatalogLevel = 'category' | 'subcategory' | 'group';

export const useCatalogContext = () => {
    const { categorySlug, subcategorySlug, groupSlug } = useParams<{
        categorySlug: string;
        subcategorySlug?: string;
        groupSlug?: string;
    }>();
    const dispatch = useAppDispatch();

    const hierarchy = useAppSelector(selectCurrentHierarchy);
    const hierarchyLoading = useAppSelector(selectHierarchyLoading);

    const hierarchyReady = !!hierarchy && hierarchy.slug === categorySlug;

    useEffect(() => {
        if (categorySlug && (!hierarchy || hierarchy.slug !== categorySlug)) {
            dispatch(fetchCategoryHierarchy(categorySlug));
        }
    }, [categorySlug, hierarchy, dispatch]);

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

    const categoryId = hierarchyReady ? String(hierarchy!.id) : '';
    const groupId = currentGroup?.id ? String(currentGroup.id) : '';

    const productsByCategory = useAppSelector(state =>
        categoryId ? selectProductsByCategory(state, categoryId) : []
    );
    const productsByGroup = useAppSelector(state =>
        groupId ? selectProductsByGroup(state, groupId) : []
    );
    const productsLoading = useAppSelector(selectProductsLoading);

    useEffect(() => {
        if (level === 'group' && groupId) {
            dispatch(fetchProductsByGroup({ groupId }));
        } else if (categoryId) {
            dispatch(fetchProductsByCategory({ categoryId }));
        }
    }, [level, groupId, categoryId, dispatch]);

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
        hierarchyLoading,
        categorySlug,
        subcategorySlug,
        groupSlug,
        currentSubcategory,
        currentGroup,
        products: productCards,
        productsLoading,
    };
};
