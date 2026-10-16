import React from 'react';
import { Skeleton, SkeletonGroup } from '@/components/common/Skeleton';
import { STATUS_MESSAGES } from '@/config/statusMessages';
import styles from './ProductDetailSkeleton.module.css';

export const ProductDetailSkeleton: React.FC = () => (
    <SkeletonGroup label={STATUS_MESSAGES.product.loading} className={styles.skeleton}>
        <Skeleton width={320} height={14} />
        <Skeleton width="55%" height={40} />
        <div className={styles.meta}>
            <Skeleton width={120} height={14} />
            <Skeleton width={160} height={14} />
            <Skeleton width={180} height={14} />
        </div>
        <div className={styles.layout}>
            <div className={styles.left}>
                <div className={styles.tabs}>
                    {Array.from({ length: 4 }).map((_, index) => <Skeleton key={index} width={110} height={36} />)}
                </div>
                <div className={styles.gallery}>
                    <Skeleton className={styles.mainImage} height="auto" />
                    <div className={styles.thumbs}>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton key={index} className={styles.thumb} height="auto" />
                        ))}
                    </div>
                </div>
            </div>
            <div className={styles.buyCard}>
                <Skeleton width="50%" height={32} />
                <Skeleton width="35%" height={14} />
                <Skeleton height={44} radius={0} />
                <Skeleton height={44} radius={0} />
                <Skeleton width="70%" height={14} />
                <Skeleton width="60%" height={14} />
            </div>
        </div>
    </SkeletonGroup>
);
