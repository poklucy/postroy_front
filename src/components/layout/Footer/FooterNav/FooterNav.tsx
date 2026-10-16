import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes.config';
import styles from './FooterNav.module.css';

interface NavLink {
    to: string;
    label: string;
    only?: 'desktop' | 'mobile';
}

const NAV_LINKS: NavLink[] = [
    { to: ROUTES.AboutPage, label: 'О компании' },
    { to: ROUTES.CATALOG, label: 'Каталог', only: 'mobile' },
    { to: ROUTES.DeliveryPage, label: 'Доставка и оплата' },
    { to: '/catalog/electrical', label: 'Политика возврата' },
    { to: ROUTES.PersonPage, label: 'Для юр. лиц' },
];

const FooterNav: React.FC<{ className?: string }> = ({ className }) => (
    <nav className={[styles.navSection, className].filter(Boolean).join(' ')} aria-label="Навигация по сайту">
        <div className={styles.title}>Навигация</div>
        <div className={styles.linkList}>
            {NAV_LINKS.map(({ to, label, only }) => (
                <Link key={label} to={to} className={[styles.link, only ? styles[only] : ''].filter(Boolean).join(' ')}>
                    {label}
                </Link>
            ))}
        </div>
    </nav>
);

export default FooterNav;
