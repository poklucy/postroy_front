import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/config/routes.config';
import styles from './EmptyMessage.module.css';

interface EmptyMessageProps {
    children: React.ReactNode;
    linkText?: string;
    linkTo?: string;
}

export const EmptyMessage: React.FC<EmptyMessageProps> = ({
                                                              children,
                                                              linkText = 'Перейти в каталог',
                                                              linkTo = ROUTES.CATALOG,
                                                          }) => (
    <div className={styles.empty}>
        <p>{children}</p>
        {linkText && <Link to={linkTo} className={styles.link}>{linkText}</Link>}
    </div>
);
