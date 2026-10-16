import React from 'react';
import { Skeleton, SkeletonGroup } from '@/components/common/Skeleton';
import { ProductListSkeleton } from '@/components/product/ProductListSkeleton';
import { STATUS_MESSAGES } from '@/config/statusMessages';
import styles from './CatalogSkeleton.module.css';

export const CategoryGridSkeleton: React.FC<{ count?: number }> = ({ count = 9 }) => (
    <SkeletonGroup label={STATUS_MESSAGES.catalog.loading} className={styles.categoryGrid}>
        {Array.from({ length: count }).map((_, index) => (
            <div key={index} className={styles.categoryCard}>
                <Skeleton height={56} radius={10} />
                {Array.from({ length: 4 }).map((__, row) => (
                    <Skeleton key={row} width={`${70 - row * 10}%`} height={14} />
                ))}
            </div>
        ))}
    </SkeletonGroup>
);

export const CatalogLevelSkeleton: React.FC = () => (
    <SkeletonGroup label={STATUS_MESSAGES.category.loading} className={styles.level}>
        <Skeleton width={220} height={14} />
        <Skeleton width="40%" height={40} />
        <div className={styles.entityGrid}>
            {Array.from({ length: 7 }).map((_, index) => (
                <Skeleton key={index} height={150} />
            ))}
        </div>
        <div className={styles.catalog}>
            <div className={styles.filters}>
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} height={index % 3 === 0 ? 20 : 14} width={index % 3 === 0 ? '60%' : '90%'} />
                ))}
            </div>
            <ProductListSkeleton columns={3} count={6} />
        </div>
    </SkeletonGroup>
);
