import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronIcon } from '@/components/common/icons';
import styles from './BackLink.module.css';

interface BackLinkProps {
    to: string;
    children: React.ReactNode;
}

export const BackLink: React.FC<BackLinkProps> = ({ to, children }) => (
    <Link to={to} className={styles.backLink}>
        <ChevronIcon direction="left" />
        <span>{children}</span>
    </Link>
);
