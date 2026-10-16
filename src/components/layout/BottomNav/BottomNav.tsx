import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '@/config/routes.config';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/slices/auth';
import { selectCartTotalItems } from '@/store/slices/cart';
import { selectFavoritesTotalItems } from '@/store/slices/favorites';
import { BagIcon, CatalogIcon, HeartIcon, HomeIcon, UserIcon } from '@/components/common/icons';
import styles from './BottomNav.module.css';

interface NavItem {
    to: string;
    label: string;
    icon: React.ReactNode;
    badge?: number;
    end?: boolean;
    isActive?: (pathname: string) => boolean;
}

export const BottomNav: React.FC = () => {
    const { pathname } = useLocation();
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const cartCount = useAppSelector(selectCartTotalItems);
    const favoritesCount = useAppSelector(selectFavoritesTotalItems);

    const items: NavItem[] = [
        { to: ROUTES.HOME, label: 'Главная', icon: <HomeIcon />, end: true },
        { to: ROUTES.CATALOG, label: 'Каталог', icon: <CatalogIcon /> },
        { to: ROUTES.CART, label: 'Корзина', icon: <BagIcon strokeWidth={1.2} />, badge: cartCount },
        { to: ROUTES.FAVORITES, label: 'Избранное', icon: <HeartIcon />, badge: favoritesCount },
        {
            to: isAuthenticated ? ROUTES.PROFILE : ROUTES.LOGIN,
            label: 'Профиль',
            icon: <UserIcon />,
            isActive: path => path.startsWith(ROUTES.PROFILE) || path === ROUTES.LOGIN,
        },
    ];

    return (
        <nav className={styles.bottomNav} aria-label="Основная навигация">
            {items.map(({ to, label, icon, badge, end, isActive }) => (
                <NavLink
                    key={label}
                    to={to}
                    end={end}
                    className={({ isActive: routeActive }) =>
                        [styles.item, (isActive ? isActive(pathname) : routeActive) ? styles.active : '']
                            .filter(Boolean)
                            .join(' ')
                    }
                >
                    <span className={styles.icon}>
                        {icon}
                        {Boolean(badge) && <span className={styles.badge}>{badge! > 99 ? '99+' : badge}</span>}
                    </span>
                    <span className={styles.label}>{label}</span>
                </NavLink>
            ))}
        </nav>
    );
};
