import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectCompareTotalItems } from '@/store/slices/compare';
import { CompareIcon as CompareSvg } from '@/components/common/icons';
import styles from './CompareIcon.module.css';

export const CompareIcon: React.FC = () => {
  const totalItems = useAppSelector(selectCompareTotalItems);

  return (
      <Link
          to="/compare"
          className={`${styles.compareIcon} ${totalItems > 0 ? styles.withBadge : ''}`}
      >
      <span className={styles.icon}>
          <CompareSvg />
      </span>
        {totalItems > 0 && (
            <span className={styles.badge}>{totalItems}</span>
        )}
    </Link>
  );
};
