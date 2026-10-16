import React from 'react';
import { Link } from 'react-router-dom';
import { ProductBadges } from '@/components/product/ProductBadges';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductActions } from '@/components/product/ProductActions';
import { ProductCartButton } from '@/components/product/ProductCartButton';
import { ProductCard as IProductCard } from '@/types/product.types';
import { getProductUrl } from '@/utils/product';
import { ImageSlider } from '@/components/product/ImageSlider';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: IProductCard;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const productUrl = getProductUrl(product);

  return (
      <div className={styles.card}>
        <ProductBadges product={product} />
        <ProductActions product={product} className={styles.actionButtons} />

        <Link to={productUrl} className={styles.imageLink}>
          <div className={styles.imageWrapper}>
            <ImageSlider
                images={product.images?.length ? product.images : [product.mainImage]}
                alt={product.name}
                hoverSwitch
                className={styles.slider}
                imageClassName={styles.image}
            />
          </div>
        </Link>

        <ProductInfo product={product} productUrl={productUrl} />
        <ProductCartButton product={product} />
      </div>
  );
};
