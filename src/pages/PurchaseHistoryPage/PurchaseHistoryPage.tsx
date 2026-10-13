import React, { useMemo, useState } from 'react';
import { useAppSelector } from '@/store/hooks';
import { selectUserOrders } from '@/store/slices/auth';
import { mapToProductCard } from '@/store/slices/products';
import { mockProducts } from '@/api/mockData/products';
import { BackLink } from '@/components/common/BackLink';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Dropdown } from '@/components/common/Dropdown';
import { EmptyMessage } from '@/components/common/EmptyMessage';
import { ProductCartButton } from '@/components/product/ProductCartButton';
import { ROUTES } from '@/config/routes.config';
import { Order, OrderItem } from '@/types/order.types';
import { ProductCard } from '@/types/product.types';
import { formatPrice } from '@/utils';
import styles from './PurchaseHistoryPage.module.css';

const MONTHS = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
];

const ALL = 'all';

const findProduct = (productId: string): ProductCard | undefined => {
    const product = mockProducts.find(p => String(p.id) === productId);
    return product ? mapToProductCard(product) : undefined;
};

const HistoryItem: React.FC<{ item: OrderItem }> = ({ item }) => {
    const product = useMemo(() => findProduct(item.productId), [item.productId]);
    const oldPrice = product?.oldPrice && product.oldPrice > item.price ? product.oldPrice : undefined;

    return (
        <li className={styles.item}>
            <div className={styles.itemImage}>
                <img src={item.image} alt={item.name} loading="lazy" />
            </div>
            <div className={styles.itemInfo}>
                <span className={styles.itemArticle}>Арт. {item.article || item.productId}</span>
                <span className={styles.itemName}>{item.name}</span>
                <span className={styles.itemQuantity}>{item.quantity} шт.</span>
                <div className={styles.itemPrices}>
                    {oldPrice && <span className={styles.itemOldPrice}>{oldPrice.toLocaleString('ru-RU')}</span>}
                    <span className={styles.itemPrice}>{formatPrice(item.price)}</span>
                </div>
            </div>
            <div className={styles.itemAction}>
                {product ? (
                    <ProductCartButton product={product} />
                ) : (
                    <button type="button" className={styles.unavailable} disabled>Товар недоступен</button>
                )}
            </div>
        </li>
    );
};

const HistoryOrder: React.FC<{ order: Order }> = ({ order }) => {
    const itemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <li className={styles.order}>
            <div className={styles.orderHeader}>
                <div className={styles.orderMeta}>
                    <span className={styles.orderNumber}>#{order.orderNumber}</span>
                    <span>Дата заказа: {new Date(order.createdAt).toLocaleDateString('ru-RU')}</span>
                    <span>Товаров: {itemsCount}</span>
                </div>
                <span className={styles.orderSum}>Сумма: {formatPrice(order.totalPrice)}</span>
            </div>
            <ul className={styles.items}>
                {order.items.map(item => (
                    <HistoryItem key={item.productId} item={item} />
                ))}
            </ul>
        </li>
    );
};

export const PurchaseHistoryPage: React.FC = () => {
    const orders = useAppSelector(selectUserOrders);
    const [year, setYear] = useState(ALL);
    const [month, setMonth] = useState(ALL);

    const yearOptions = useMemo(() => {
        const years = Array.from(new Set(orders.map(o => new Date(o.createdAt).getFullYear()))).sort((a, b) => b - a);
        return [{ value: ALL, label: 'Все годы' }, ...years.map(y => ({ value: String(y), label: String(y) }))];
    }, [orders]);

    const monthOptions = [{ value: ALL, label: 'Все месяцы' }, ...MONTHS.map((m, i) => ({ value: String(i), label: m }))];

    const filtered = orders.filter(order => {
        const date = new Date(order.createdAt);
        return (year === ALL || date.getFullYear() === Number(year)) &&
            (month === ALL || date.getMonth() === Number(month));
    });

    return (
        <div className={`page ${styles.historyPage}`}>
            <Breadcrumbs />

            <div className={styles.header}>
                <h1>История покупок</h1>
                <BackLink to={ROUTES.PROFILE}>Вернуться в профиль</BackLink>
            </div>

            <div className={styles.filters}>
                <Dropdown options={yearOptions} value={year} onChange={setYear} ariaLabel="Год" className={styles.filter} />
                <Dropdown options={monthOptions} value={month} onChange={setMonth} ariaLabel="Месяц" className={styles.filter} />
            </div>

            {filtered.length === 0 ? (
                <EmptyMessage>{orders.length === 0 ? 'Вы ещё ничего не покупали' : 'За выбранный период покупок нет'}</EmptyMessage>
            ) : (
                <ul className={styles.orders}>
                    {filtered.map(order => (
                        <HistoryOrder key={order.id} order={order} />
                    ))}
                </ul>
            )}
        </div>
    );
};
