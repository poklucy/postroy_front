import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectUserOrders } from '@/store/slices/auth';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyMessage } from '@/components/common/EmptyMessage';
import { ROUTES } from '@/config/routes.config';
import { Order, OrderStatus } from '@/types/order.types';
import { formatPrice } from '@/utils';
import styles from './ProfileOrdersPage.module.css';

type Tab = 'current' | 'returns';

const TABS: { id: Tab; label: string }[] = [
    { id: 'current', label: 'Текущие заказы' },
    { id: 'returns', label: 'Возвраты' },
];

const STATUS_LABELS: Record<OrderStatus, string> = {
    pending: 'Ожидает подтверждения',
    confirmed: 'Подтвержден',
    processing: 'В обработке',
    shipping: 'Отправлен',
    delivered: 'Доставлен',
    cancelled: 'Отменен',
};

const STATUS_CLASSES: Record<OrderStatus, string> = {
    pending: styles.statusPending,
    confirmed: styles.statusProgress,
    processing: styles.statusProgress,
    shipping: styles.statusDone,
    delivered: styles.statusDone,
    cancelled: styles.statusCancelled,
};

const FINISHED_STATUSES: OrderStatus[] = ['delivered', 'cancelled'];

const EMPTY_MESSAGES: Record<Tab, string> = {
    current: 'У вас нет текущих заказов',
    returns: 'Возвратов пока нет',
};

const filterOrders = (orders: Order[], tab: Tab) =>
    tab === 'current' ? orders.filter(o => !FINISHED_STATUSES.includes(o.status)) : [];

const isTab = (value: string | null): value is Tab => TABS.some(t => t.id === value);

export const ProfileOrdersPage: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const tabParam = searchParams.get('tab');
    const tab: Tab = isTab(tabParam) ? tabParam : 'current';
    const orders = filterOrders(useAppSelector(selectUserOrders), tab);

    return (
        <div className={`page ${styles.ordersPage}`}>
            <Breadcrumbs />
            <h1>Мои заказы</h1>

            <div className={styles.tabs} role="tablist">
                {TABS.map(t => (
                    <button
                        key={t.id}
                        type="button"
                        role="tab"
                        aria-selected={t.id === tab}
                        className={`${styles.tab} ${t.id === tab ? styles.tabActive : ''}`}
                        onClick={() => setSearchParams({ tab: t.id })}
                    >
                        {t.label}
                    </button>
                ))}
                <Link to={ROUTES.PROFILE_HISTORY} className={styles.tab}>История покупок</Link>
            </div>

            {orders.length === 0 ? (
                <EmptyMessage>{EMPTY_MESSAGES[tab]}</EmptyMessage>
            ) : (
                <ul className={styles.list}>
                    {orders.map(order => (
                        <li key={order.id} className={styles.order}>
                            <div className={styles.orderHeader}>
                                <div className={styles.orderTitle}>
                                    <span className={styles.orderNumber}>Заказ №{order.orderNumber}</span>
                                    <span className={styles.orderDate}>
                                        от {new Date(order.createdAt).toLocaleDateString('ru-RU')}
                                    </span>
                                </div>
                                <span className={`${styles.status} ${STATUS_CLASSES[order.status]}`}>
                                    {STATUS_LABELS[order.status]}
                                </span>
                            </div>

                            <ul className={styles.items}>
                                {order.items.map(item => (
                                    <li key={item.productId} className={styles.item}>
                                        <img src={item.image} alt={item.name} className={styles.itemImage} />
                                        <span className={styles.itemName}>{item.name}</span>
                                        <span className={styles.itemPrice}>
                                            {item.quantity} × {formatPrice(item.price)}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <div className={styles.orderFooter}>
                                <span className={styles.delivery}>
                                    {order.delivery.method === 'courier' ? 'Курьер' : 'Самовывоз'}: {order.delivery.address}
                                </span>
                                <span className={styles.total}>Итого: {formatPrice(order.totalPrice)}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
