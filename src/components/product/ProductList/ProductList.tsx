import React from 'react';
import { ProductCard as ProductCardType } from '@/types/product.types';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardHorizontal } from '@/components/product/ProductCardHorizontal';
import styles from './ProductList.module.css';

export type ViewMode = 'grid' | 'list';

interface ProductListProps {
    products: ProductCardType[];
    columns?: number;
    loading?: boolean;
    emptyMessage?: string;
    viewMode?: ViewMode;

    selectable?: boolean;
    selectedIds?: string[];
    onToggleSelect?: (id: string) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
                                                            products,
                                                            columns = 4,
                                                            loading,
                                                            emptyMessage = 'Товары не найдены',
                                                            viewMode = 'grid',
                                                            selectable = false,
                                                            selectedIds = [],
                                                            onToggleSelect,
                                                        }) => {
    if (loading) {
        return <div className={styles.loading}>Загрузка...</div>;
    }

    if (!products || products.length === 0) {
        return <div className={styles.empty}>{emptyMessage}</div>;
    }

    if (viewMode === 'list') {
        return (
            <div className={styles.productListMode}>
                {products.map(product => (
                    <ProductCardHorizontal
                        key={product.id}
                        product={product}
                        selectable={selectable}
                        selected={selectedIds.includes(product.id)}
                        onToggleSelect={onToggleSelect}
                    />
                ))}
            </div>
        );
    }

    return (
        <div
            className={styles.productList}
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
};
