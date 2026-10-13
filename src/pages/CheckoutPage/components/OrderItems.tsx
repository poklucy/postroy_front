import React from 'react';
import { CartItem } from '@/store/slices/cart';
import { formatPrice } from '@/utils';
import styles from '../CheckoutPage.module.css';

interface OrderItemsProps {
    items: CartItem[];
}

export const OrderItems: React.FC<OrderItemsProps> = ({ items }) => (
    <section className={styles.section}>
        <h2 className={styles.sectionTitle}>1. Общая информация о заказе</h2>
        <span className={styles.fieldLabel}>Состав заказа</span>

        <ul className={styles.items}>
            {items.map(item => (
                <li key={item.productId} className={styles.item}>
                    <div className={styles.itemImage}>
                        <img src={item.image} alt={item.name} />
                    </div>
                    <div className={styles.itemInfo}>
                        <span className={styles.itemArticle}>Арт. {item.article || item.productId}</span>
                        <span className={styles.itemName}>{item.name}</span>
                        <span className={styles.itemQuantity}>{item.quantity} шт</span>
                    </div>
                    <div className={styles.itemPrices}>
                        <span className={styles.itemUnitPrice}>{formatPrice(item.price)}/шт</span>
                        <span className={styles.itemTotal}>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                </li>
            ))}
        </ul>
    </section>
);
