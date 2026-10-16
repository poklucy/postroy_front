import React from 'react';
import { ProductCard as ProductCardType } from '@/types/product.types';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardHorizontal } from '@/components/product/ProductCardHorizontal';
import { ProductListSkeleton } from '@/components/product/ProductListSkeleton';
import { StatusMessage } from '@/components/common/StatusMessage';
import { STATUS_MESSAGES, StatusText } from '@/config/statusMessages';
import { RequestError } from '@/types/request.types';
import styles from './ProductList.module.css';

export type ViewMode = 'grid' | 'list';

interface ProductListProps {
    products: ProductCardType[];
    columns?: number;
    loading?: boolean;
    error?: RequestError | null;
    onRetry?: () => void;
    errorText?: StatusText;
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
                                                            error,
                                                            onRetry,
                                                            errorText = STATUS_MESSAGES.products.error,
                                                            emptyMessage = STATUS_MESSAGES.products.empty.default.title,
                                                            viewMode = 'grid',
                                                            selectable = false,
                                                            selectedIds = [],
                                                            onToggleSelect,
                                                        }) => {
    if (loading) {
        return <ProductListSkeleton columns={columns} viewMode={viewMode} />;
    }

    if (error) {
        return <StatusMessage error={error} text={errorText} onRetry={onRetry} />;
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
