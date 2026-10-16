import React from 'react';
import { Skeleton, SkeletonGroup } from '@/components/common/Skeleton';
import { STATUS_MESSAGES } from '@/config/statusMessages';
import styles from './ProductListSkeleton.module.css';

interface ProductListSkeletonProps {
    count?: number;
    columns?: number;
    viewMode?: 'grid' | 'list';
    label?: string;
}

export const ProductCardSkeleton: React.FC = () => (
    <div className={styles.card}>
        <Skeleton className={styles.image} height="auto" />
        <Skeleton width="40%" height={12} />
        <Skeleton height={16} />
        <Skeleton width="70%" height={16} />
        <Skeleton width="50%" height={24} />
        <Skeleton height={44} radius={0} />
    </div>
);

const ProductRowSkeleton: React.FC = () => (
    <div className={styles.row}>
        <Skeleton className={styles.rowImage} height="auto" />
        <div className={styles.rowBody}>
            <Skeleton width="30%" height={12} />
            <Skeleton width="80%" height={18} />
            <Skeleton width="60%" height={14} />
        </div>
        <div className={styles.rowSide}>
            <Skeleton width={120} height={24} />
            <Skeleton width={160} height={44} radius={0} />
        </div>
    </div>
);

export const ProductListSkeleton: React.FC<ProductListSkeletonProps> = ({
                                                                            count,
                                                                            columns = 4,
                                                                            viewMode = 'grid',
                                                                            label = STATUS_MESSAGES.products.loading,
                                                                        }) => {
    const items = Array.from({ length: count ?? (viewMode === 'list' ? 3 : columns * 2) });

    if (viewMode === 'list') {
        return (
            <SkeletonGroup label={label} className={styles.list}>
                {items.map((_, index) => <ProductRowSkeleton key={index} />)}
            </SkeletonGroup>
        );
    }

    return (
        <SkeletonGroup label={label} className={styles.grid}>
            <div className={styles.gridInner} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                {items.map((_, index) => <ProductCardSkeleton key={index} />)}
            </div>
        </SkeletonGroup>
    );
};
