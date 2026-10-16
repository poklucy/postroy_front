import React from 'react';
import { STATUS_MESSAGES } from '@/config/statusMessages';
import styles from './Spinner.module.css';

interface SpinnerProps {
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    inline?: boolean;
    className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
                                                    label = STATUS_MESSAGES.common.loading,
                                                    size = 'md',
                                                    inline = false,
                                                    className,
                                                }) => (
    <div
        className={[styles.spinner, styles[size], inline ? styles.inline : '', className].filter(Boolean).join(' ')}
        role="status"
        aria-live="polite"
    >
        <span className={styles.icon} aria-hidden="true" />
        {label && <span className={styles.label}>{label}</span>}
    </div>
);
