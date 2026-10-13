import React from 'react';
import { FavoriteButton } from '@/components/common/FavoriteButton';
import { CompareButton } from '@/components/common/CompareButton';
import { ProductCard } from '@/types/product.types';

interface ProductActionsProps {
    product: ProductCard;
    className?: string;
    showCompare?: boolean;
}

export const ProductActions: React.FC<ProductActionsProps> = ({ product, className, showCompare = true }) => (
    <div className={className}>
        <FavoriteButton product={product} size="small" />
        {showCompare && <CompareButton product={product} size="small" />}
    </div>
);
