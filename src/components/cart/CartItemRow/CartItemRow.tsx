import React from 'react';
import { Link } from 'react-router-dom';
import { Checkbox } from '@/components/common/Checkbox';
import { QuantityControls } from '@/components/common/QuantityControls';
import { CartItem } from '@/store/slices/cart';
import { TrashIcon } from '@/components/common/icons';
import { formatPrice } from '@/utils';
import { buildProductUrl } from '@/config/routes.config';
import styles from './CartItemRow.module.css';

interface CartItemRowProps {
    item: CartItem;
    selected: boolean;
    onSelectChange: (id: string) => void;
    onQuantityChange: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({
                                                            item,
                                                            selected,
                                                            onSelectChange,
                                                            onQuantityChange,
                                                            onRemove,
                                                        }) => {
    const inStock = item.inStock !== false;
    const total = item.price * item.quantity;

    const productUrl = buildProductUrl(
        item.categorySlug || '',
        item.subcategorySlug || '',
        item.groupSlug || '',
        item.slug || String(item.productId),
    );

    return (
        <div className={styles.row}>
            <div className={styles.checkbox}>
                <Checkbox
                    checked={selected}
                    onChange={() => onSelectChange(item.productId)}
                />
            </div>

            <div className={styles.image}>
                <img src={item.image} alt={item.name} />
            </div>

            <div className={styles.info}>
        <span className={styles.article}>
          Арт. {item.article || item.productId}
        </span>
                <Link to={productUrl} className={styles.name}>
                    {item.name}
                </Link>


                {!inStock && (
                    <span className={styles.outOfStockLabel}>Товар разобрали</span>
                )}
            </div>

            <div className={styles.prices}>
        <span className={styles.unitPrice}>
          {formatPrice(item.price)}/шт
        </span>
                {inStock ? (
                    <div className={styles.totalPrice}>{formatPrice(total)}</div>
                ) : (
                    <button className={styles.outOfStockBtn} type="button" disabled>
                        Товар разобрали
                    </button>
                )}
            </div>

            <div className={styles.actions}>
                {inStock && (
                    <QuantityControls
                        value={item.quantity}
                        min={1}
                        max={item.maxQuantity ?? 99}
                        onChange={(q) => onQuantityChange(item.productId, q)}
                        showGoToCart={false}
                    />
                )}

                <button
                    className={styles.removeBtn}
                    onClick={() => onRemove(item.productId)}
                    aria-label="Удалить"
                    type="button"
                >
                    <TrashIcon />
</button>
            </div>
        </div>
    );
};
