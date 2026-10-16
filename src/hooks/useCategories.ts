import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    fetchAllCategoriesWithHierarchy,
    selectAllCategoriesWithHierarchy,
    selectCategoriesListRequest,
} from '@/store/slices/categories';

export const useAllCategories = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectAllCategoriesWithHierarchy);
    const { status, error } = useAppSelector(selectCategoriesListRequest);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAllCategoriesWithHierarchy());
        }
    }, [dispatch, status]);

    const retry = useCallback(() => {
        dispatch(fetchAllCategoriesWithHierarchy());
    }, [dispatch]);

    return {
        categories,
        status,
        error,
        isLoading: status === 'idle' || status === 'loading',
        isError: status === 'failed' && categories.length === 0,
        retry,
    };
};
