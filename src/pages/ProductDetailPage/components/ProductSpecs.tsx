import React from 'react';
import { Specification } from '@/types/product.types';
import styles from '../ProductDetailPage.module.css';

export const ProductSpecs: React.FC<{ specifications?: Specification[] }> = ({ specifications }) =>
    specifications?.length ? (
        <div className={styles.specGrid}>
            {specifications.map((spec, i) => (
                <div className={styles.specRow} key={i}>
                    <span className={styles.specName}>{spec.name}</span>
                    <span className={styles.specDots} />
                    <span className={styles.specValue}>
                        {spec.value} {spec.unit || ''}
                    </span>
                </div>
            ))}
        </div>
    ) : null;
