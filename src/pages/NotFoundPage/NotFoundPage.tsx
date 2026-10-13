import React from 'react';
import { Button } from '@/components/common/Button';
import { ROUTES } from '@/config/routes.config';
import styles from './NotFoundPage.module.css';

export const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <div className="container">
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Страница не найдена</h2>
        <Button to={ROUTES.HOME} className={styles.button}>
          На главную
        </Button>
      </div>
    </div>
  );
};
