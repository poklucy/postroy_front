import React, { useState } from 'react';
import { ProductBadges } from '@/components/product/ProductBadges';
import { ImageSlider } from '@/components/product/ImageSlider';
import { ProductCard } from '@/types/product.types';
import styles from '../ProductDetailPage.module.css';

interface ProductGalleryProps {
    product: ProductCard;
    variant?: 'desktop' | 'mobile';
}

const VISIBLE_THUMBS = 4;

const ArrowIcon: React.FC<{ direction: 'left' | 'right' }> = ({ direction }) => (
    <svg
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        aria-hidden="true"
        style={direction === 'left' ? { transform: 'scaleX(-1)' } : undefined}
    >
        <path d="M1 6H13M8 1L13 6L8 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const ProductGallery: React.FC<ProductGalleryProps> = ({ product, variant = 'desktop' }) => {
    const images = product.images?.length ? product.images : [product.mainImage];
    const [index, setIndex] = useState(0);
    const isMobile = variant === 'mobile';

    const thumbStart = Math.min(Math.max(0, index - VISIBLE_THUMBS + 1), Math.max(0, images.length - VISIBLE_THUMBS));
    const visibleThumbs = images.slice(thumbStart, thumbStart + VISIBLE_THUMBS);

    return (
        <div className={isMobile ? styles.mobileGallery : styles.gallery}>
            <div className={isMobile ? styles.mobileMain : styles.mainImage}>
                <ProductBadges product={product} />
                <ImageSlider
                    images={images}
                    alt={product.name}
                    index={index}
                    onIndexChange={setIndex}
                    indicator={isMobile}
                    imageClassName={styles.galleryImage}
                />
            </div>

            {!isMobile && images.length > 1 && (
                <div className={styles.thumbsRow}>
                    <button
                        type="button"
                        className={`${styles.thumbArrow} ${styles.thumbArrowPrev}`}
                        onClick={() => setIndex(i => Math.max(0, i - 1))}
                        disabled={index === 0}
                        aria-label="Предыдущее фото"
                    >
                        <ArrowIcon direction="left" />
                    </button>
                    <div className={styles.thumbnails}>
                        {visibleThumbs.map((img, i) => {
                            const realIndex = thumbStart + i;
                            return (
                                <button
                                    key={realIndex}
                                    type="button"
                                    className={`${styles.thumbnail} ${index === realIndex ? styles.active : ''}`}
                                    onClick={() => setIndex(realIndex)}
                                    aria-label={`Фото ${realIndex + 1}`}
                                >
                                    <img src={img} alt="" />
                                </button>
                            );
                        })}
                    </div>
                    <button
                        type="button"
                        className={`${styles.thumbArrow} ${styles.thumbArrowNext}`}
                        onClick={() => setIndex(i => Math.min(images.length - 1, i + 1))}
                        disabled={index === images.length - 1}
                        aria-label="Следующее фото"
                    >
                        <ArrowIcon direction="right" />
                    </button>
                </div>
            )}
        </div>
    );
};
