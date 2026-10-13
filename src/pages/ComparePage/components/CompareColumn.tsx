import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductActions } from '@/components/product/ProductActions';
import { ProductCartButton } from '@/components/product/ProductCartButton';
import { getProductUrl } from '@/utils/product';
import { ProductCard } from '@/types/product.types';
import { formatPrice } from '@/utils';
import styles from '../ComparePage.module.css';

interface CompareColumnProps {
    item: ProductCard;
    position: number;
    total: number;
    canNavigate: boolean;
    onPrev: () => void;
    onNext: () => void;
}

const ArrowIcon: React.FC<{ direction: 'left' | 'right' }> = ({ direction }) => (
    <svg
        width="12"
        height="10"
        viewBox="0 0 12 10"
        fill="none"
        aria-hidden="true"
        style={direction === 'left' ? { transform: 'scaleX(-1)' } : undefined}
    >
        <path d="M1 5H11M7 1L11 5L7 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const CompareColumn: React.FC<CompareColumnProps> = ({ item, position, total, canNavigate, onPrev, onNext }) => {
    const productUrl = getProductUrl(item);
    const images = item.images?.length ? item.images : [item.mainImage];
    const [imageIndex, setImageIndex] = useState(0);
    const currentImage = images[Math.min(imageIndex, images.length - 1)];

    return (
        <div className={styles.column}>
            <div className={styles.imageBox}>
                <ProductActions product={item} className={styles.imageActions} />

                <Link to={productUrl} className={styles.imageLink}>
                    <img src={currentImage} alt={item.name} className={styles.image} />
                </Link>

                {images.length > 1 && (
                    <div className={styles.dots}>
                        {images.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                className={`${styles.dot} ${index === imageIndex ? styles.dotActive : ''}`}
                                onClick={() => setImageIndex(index)}
                                onMouseEnter={() => setImageIndex(index)}
                                aria-label={`Фото ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className={styles.info}>
                <div className={styles.infoLeft}>
                    <span className={styles.article}>Арт. {item.article}</span>
                    <Link to={productUrl} className={styles.name}>{item.name}</Link>
                </div>
                <div className={styles.infoRight}>
                    <span className={styles.priceLabel}>Цена за шт.</span>
                    <span className={styles.price}>{formatPrice(item.price)}</span>
                    <ProductCartButton product={item} showGoToCart={false} />
                    <span className={styles.bonus}>
                        Начислим баллы: <span className={styles.bonusValue}>+{item.bonusPoints ?? 0}</span>
                    </span>
                </div>
            </div>

            <div className={styles.pager}>
                <button
                    type="button"
                    className={styles.pagerButton}
                    onClick={onPrev}
                    disabled={!canNavigate}
                    aria-label="Предыдущий товар"
                >
                    <ArrowIcon direction="left" />
                </button>
                <span>{position} из {total}</span>
                <button
                    type="button"
                    className={styles.pagerButton}
                    onClick={onNext}
                    disabled={!canNavigate}
                    aria-label="Следующий товар"
                >
                    <ArrowIcon direction="right" />
                </button>
            </div>
        </div>
    );
};
