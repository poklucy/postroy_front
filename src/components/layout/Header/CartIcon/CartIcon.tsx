import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectCartTotalItems } from '@/store/slices/cart';
import styles from './CartIcon.module.css';

export const CartIcon: React.FC = () => {
  const totalItems = useAppSelector(selectCartTotalItems);

  return (
      <Link
          to="/cart"
          className={`${styles.cartIcon} ${totalItems > 0 ? styles.withBadge : ''}`}
      >
      <span className={styles.icon}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M5 2L2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V6L17 2H5Z"
                stroke="black"/>
            <path d="M2 6H20" stroke="black"/>
            <path
                d="M15 10C15 11.0609 14.5786 12.0783 13.8284 12.8284C13.0783 13.5786 12.0609 14 11 14C9.93913 14 8.92172 13.5786 8.17157 12.8284C7.42143 12.0783 7 11.0609 7 10"
                stroke="black"/>
          </svg>
      </span>
        {totalItems > 0 && (
            <span className={styles.badge}>{totalItems}</span>
        )}
    </Link>
  );
};
