import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectFavoritesTotalItems } from '@/store/slices/favorites';
import { HeartIcon } from '@/components/common/icons';
import styles from './FavoritesIcon.module.css';

export const FavoritesIcon: React.FC = () => {
    const totalItems = useAppSelector(selectFavoritesTotalItems);

    return (
        <Link
            to="/favorites"
            className={`${styles.favoritesIcon} ${totalItems > 0 ? styles.withBadge : ''}`}
        >
      <span className={styles.icon}>
        <HeartIcon />
      </span>
            {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
        </Link>
    );
};
