import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    MAX_COMPARE_ITEMS,
    selectCompareMaxReached,
    selectIsInCompare,
    toggleCompare,
} from '@/store/slices/compare';
import { ProductCard } from '@/types/product.types';

export const useCompareToggle = (product: ProductCard) => {
    const dispatch = useAppDispatch();
    const isInCompare = useAppSelector(state => selectIsInCompare(state, String(product.id)));
    const maxReached = useAppSelector(selectCompareMaxReached);

    const toggle = useCallback(() => {
        if (!isInCompare && maxReached) {
            alert(`Максимум ${MAX_COMPARE_ITEMS} товара для сравнения`);
            return;
        }
        dispatch(toggleCompare(product));
    }, [dispatch, product, isInCompare, maxReached]);

    return { isInCompare, toggle };
};
