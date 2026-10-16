import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes.config';
import styles from './OrdersTabs.module.css';

export type OrdersTab = 'current' | 'returns' | 'history';

const TABS: { id: OrdersTab; label: string; to: string }[] = [
    { id: 'current', label: 'Текущие заказы', to: `${ROUTES.PROFILE_ORDERS}?tab=current` },
    { id: 'returns', label: 'Возвраты', to: `${ROUTES.PROFILE_ORDERS}?tab=returns` },
    { id: 'history', label: 'История покупок', to: ROUTES.PROFILE_HISTORY },
];

export const OrdersTabs: React.FC<{ active: OrdersTab }> = ({ active }) => (
    <nav className={styles.tabs} aria-label="Разделы заказов">
        {TABS.map(tab => (
            <Link
                key={tab.id}
                to={tab.to}
                replace
                aria-current={tab.id === active ? 'page' : undefined}
                className={`${styles.tab} ${tab.id === active ? styles.tabActive : ''}`}
            >
                {tab.label}
            </Link>
        ))}
    </nav>
);
