import React from 'react';
import { ProductActionButton, ProductActionButtonProps } from '@/components/common/ProductActionButton';
import { HeartIcon } from '@/components/common/icons';
import { useFavoriteToggle } from '@/hooks/useFavoriteToggle';
import { ProductCard } from '@/types/product.types';

type FavoriteButtonProps = Pick<ProductActionButtonProps, 'size' | 'className' | 'label'> & {
    product: ProductCard;
};

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ product, ...rest }) => {
    const { isFavorite, toggle } = useFavoriteToggle(product);

    return (
        <ProductActionButton
            {...rest}
            active={isFavorite}
            onToggle={toggle}
            icon={<HeartIcon filled={isFavorite} />}
            ariaLabel={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        />
    );
};
