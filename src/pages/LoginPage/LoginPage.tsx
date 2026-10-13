import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/slices/auth';
import { SmsAuthForm } from '@/components/auth/SmsAuthForm';
import { ROUTES } from '@/config/routes.config';
import styles from './LoginPage.module.css';

export const LoginPage: React.FC = () => {
  const location = useLocation();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const redirectTo = (location.state as { from?: string } | null)?.from ?? ROUTES.PROFILE;

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.container}>
        <div className={styles.card}>
          <SmsAuthForm titleTag="h1" />
        </div>
      </div>
    </div>
  );
};
