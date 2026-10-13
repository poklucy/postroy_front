import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchAllCategoriesWithHierarchy } from '@/store/slices/categories';
import {
    selectAllCategoriesWithHierarchy,
    selectCategoriesListLoading,
} from '@/store/slices/categories/categories.selectors';

export const useAllCategories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectAllCategoriesWithHierarchy);
    const isLoading = useAppSelector(selectCategoriesListLoading);

    useEffect(() => {
        if (categories.length === 0 && !isLoading) {
            dispatch(fetchAllCategoriesWithHierarchy());
        }
    }, [dispatch, categories.length, isLoading]);

    return { categories, isLoading };
};
