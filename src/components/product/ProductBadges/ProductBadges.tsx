import React from 'react';
import { ProductCard } from '@/types/product.types';
import styles from './ProductBadges.module.css';

interface ProductBadgesProps {
    product: ProductCard;
}

export const ProductBadges: React.FC<ProductBadgesProps> = ({ product }) => {
    const {
        isSuperPrice,
        isNew,
        isHit,
    } = product;

    return (
        <div className={styles.badges}>
            {isSuperPrice && <span className={styles.superPrice}>Суперцена</span>}
            {isNew && <span className={styles.new}>Новинка</span>}
            {isHit && <span className={styles.hit}>Хит!</span>}
        </div>
    );
};
