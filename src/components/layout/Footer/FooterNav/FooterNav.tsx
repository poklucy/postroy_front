import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FooterNav.module.css';

interface NavLink {
    to: string;
    label: string;
}

interface NavColumn {
    links: NavLink[];
}

const navItems: NavColumn[] = [
    {
        links: [
            { to: '/about', label: 'О компании' },
            { to: '/delivery', label: 'Доставка и оплата' },
            { to: '/catalog/electrical', label: 'Политика возврата' },
            { to: 'person', label: 'Для юр. лиц' },
        ]
    }
];

const FooterNav: React.FC = () => {
    return (
        <div className={styles.navSection}>
            <div className={`small-text ${styles.title}`}>Навигация</div>
            {navItems.map((column, index) => (
                <div className={styles.linkList} key={index}>
                    {column.links.map((link, linkIndex) => (
                        <Link key={linkIndex} to={link.to} className="btn">
                            {link.label}
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default FooterNav;
