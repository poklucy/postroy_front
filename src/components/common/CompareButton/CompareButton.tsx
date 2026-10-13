import React from 'react';
import { ProductActionButton, ProductActionButtonProps } from '@/components/common/ProductActionButton';
import { CompareIcon } from '@/components/common/icons';
import { useCompareToggle } from '@/hooks/useCompareToggle';
import { ProductCard } from '@/types/product.types';

type CompareButtonProps = Pick<ProductActionButtonProps, 'size' | 'className' | 'label'> & {
    product: ProductCard;
};

export const CompareButton: React.FC<CompareButtonProps> = ({ product, ...rest }) => {
    const { isInCompare, toggle } = useCompareToggle(product);

    return (
        <ProductActionButton
            {...rest}
            active={isInCompare}
            onToggle={toggle}
            icon={<CompareIcon filled={isInCompare} />}
            ariaLabel={isInCompare ? 'Удалить из сравнения' : 'Добавить в сравнение'}
        />
    );
};
