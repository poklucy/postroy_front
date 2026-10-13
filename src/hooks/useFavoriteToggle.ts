import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsFavorite, toggleFavorite } from '@/store/slices/favorites';
import { ProductCard } from '@/types/product.types';

export const useFavoriteToggle = (product: ProductCard) => {
    const dispatch = useAppDispatch();
    const isFavorite = useAppSelector(state => selectIsFavorite(state, String(product.id)));

    const toggle = useCallback(() => {
        dispatch(toggleFavorite(product));
    }, [dispatch, product]);

    return { isFavorite, toggle };
};
