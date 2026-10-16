import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    MAX_COMPARE_ITEMS,
    selectCompareMaxReached,
    selectIsInCompare,
    toggleCompare,
} from '@/store/slices/compare';
import { showToast } from '@/store/slices/notifications';
import { ROUTES } from '@/config/routes.config';
import { STATUS_MESSAGES } from '@/config/statusMessages';
import { ProductCard } from '@/types/product.types';

const compareLink = { to: ROUTES.COMPARE, label: STATUS_MESSAGES.compare.link };

export const useCompareToggle = (product: ProductCard) => {
    const dispatch = useAppDispatch();
    const isInCompare = useAppSelector(state => selectIsInCompare(state, String(product.id)));
    const maxReached = useAppSelector(selectCompareMaxReached);

    const toggle = useCallback(() => {
        if (!isInCompare && maxReached) {
            dispatch(showToast({ message: STATUS_MESSAGES.compare.limit(MAX_COMPARE_ITEMS), tone: 'warning', link: compareLink }));
            return;
        }
        dispatch(toggleCompare(product));
        if (!isInCompare) {
            dispatch(showToast({ message: STATUS_MESSAGES.compare.added, link: compareLink }));
        }
    }, [dispatch, product, isInCompare, maxReached]);

    return { isInCompare, toggle };
};
