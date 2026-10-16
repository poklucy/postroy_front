import React from 'react';
import { BackLink } from '@/components/common/BackLink';
import { ROUTES } from '@/config/routes.config';
import styles from './ProfilePageHeader.module.css';

export const ProfilePageHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className={styles.header}>
        <h1>{title}</h1>
        <BackLink to={ROUTES.PROFILE}>Вернуться в профиль</BackLink>
    </div>
);
