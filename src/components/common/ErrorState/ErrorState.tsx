import React from 'react';
import styles from './ErrorState.module.css';

interface ErrorStateProps {
    code: string;
    title: string;
    description: React.ReactNode;
    actions: React.ReactNode;
    children?: React.ReactNode;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ code, title, description, actions, children }) => (
    <section className={styles.errorState}>
        <div className={styles.content}>
            <span className={styles.accent}>Ошибка {code}</span>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.description}>{description}</p>
            <div className={styles.actions}>{actions}</div>
            {children}
        </div>

        <div className={styles.visual} aria-hidden="true">
            <svg className={styles.corner} viewBox="0 0 46 46" fill="none">
                <path d="M36.0727 9.2L0 9.2L9.01817 0H45.0908V36.8L36.0727 46V9.2Z" fill="currentColor" />
            </svg>
            <span className={styles.code}>{code}</span>
        </div>
    </section>
);
