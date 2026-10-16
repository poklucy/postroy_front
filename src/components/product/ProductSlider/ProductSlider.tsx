import React from 'react';
import { Swiper } from '@/components/common/Swiper';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCard as IProductCard } from '@/types/product.types';
import styles from './ProductSlider.module.css';

interface ProductSliderProps {
  products: IProductCard[];
  title?: string;
  slidesPerView?: number;
  autoplay?: boolean;
}

export const ProductSlider: React.FC<ProductSliderProps> = ({
  products,
  title,
  slidesPerView = 4,
  autoplay = false,
}) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className={styles.productSlider}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={16}
        navigation={true}
        pagination={true}
        autoplay={autoplay}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          600: { slidesPerView: 2.5, spaceBetween: 12 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: slidesPerView || 4, spaceBetween: 16 },
        }}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Swiper>
    </div>
  );
};
