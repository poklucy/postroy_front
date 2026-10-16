import React from 'react';
import { Link } from 'react-router-dom';
import { ProductCard } from '@/types/product.types';
import styles from './ProductInfo.module.css';
import { formatPrice } from '@/utils';

interface ProductInfoProps {
    product: ProductCard;
    productUrl: string;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product, productUrl }) => {
    const {
        article,
        name,
        price,
        oldPrice,
        inStock,
    } = product;

    return (
        <div className={styles.content}>
            <div className={styles.article}>Арт. {article}</div>

            <Link to={productUrl} className={styles.nameLink}>
                <h3 className={styles.name}>{name}</h3>
            </Link>

            <div className={styles.infoContainer}>
                <div className={styles.priceWrapper}>
                    Цена за штуку
                    <div className={styles.priceContainer}>
                        {Boolean(oldPrice) && (
                            <span className={styles.oldPrice}>
                                {formatPrice(oldPrice)}
                            </span>
                        )}
                        <span className={styles.price}>
                            {formatPrice(price)}
                        </span>
                    </div>
                </div>

                <div className={styles.stock}>
                    {inStock ? (
                        <span className={styles.inStock}><svg width="15" height="15" viewBox="0 0 15 15" fill="none"
                                                              xmlns="http://www.w3.org/2000/svg">
<path
    d="M7.5 1.40039C10.8688 1.40039 13.6004 4.13124 13.6006 7.5C13.6004 10.8688 10.8688 13.6006 7.5 13.6006C4.13136 13.6004 1.40059 10.8686 1.40039 7.5C1.4006 4.13137 4.13137 1.4006 7.5 1.40039ZM7.5 2.40039C4.68366 2.4006 2.4006 4.68366 2.40039 7.5C2.40059 10.3164 4.68365 12.6004 7.5 12.6006C10.3165 12.6006 12.6004 10.3165 12.6006 7.5C12.6004 4.68353 10.3165 2.40039 7.5 2.40039ZM9.5459 5.54688C9.74113 5.35165 10.0577 5.35171 10.2529 5.54688C10.448 5.74215 10.4481 6.05871 10.2529 6.25391L7.05273 9.4541C6.85749 9.64883 6.54082 9.64902 6.3457 9.4541L4.74609 7.85352C4.55109 7.6583 4.55108 7.3417 4.74609 7.14648C4.94131 6.95148 5.25791 6.95148 5.45312 7.14648L6.69922 8.39258L9.5459 5.54688Z"
    fill="#1BB21B"/>
</svg>
 В наличии</span>
                    ) : (
                        <span className={styles.outOfStock}>✗ Нет в наличии</span>
                    )}
                </div>
            </div>
        </div>
    );
};
