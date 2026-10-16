import React, { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { STATUS_MESSAGES, StatusText, getErrorText } from '@/config/statusMessages';
import { useRetryOnReconnect } from '@/hooks/useOnlineStatus';
import { RequestError } from '@/types/request.types';
import styles from './StatusMessage.module.css';

interface StatusMessageProps {
    error?: RequestError | null;
    text?: StatusText;
    onRetry?: () => void;
    retrying?: boolean;
    compact?: boolean;
    action?: React.ReactNode;
    className?: string;
}

const ErrorIcon: React.FC = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3L22 20H2L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12 10V14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
    </svg>
);

export const StatusMessage: React.FC<StatusMessageProps> = ({
                                                                error,
                                                                text,
                                                                onRetry,
                                                                retrying = false,
                                                                compact = false,
                                                                action,
                                                                className,
                                                            }) => {
    const { title, description } = getErrorText(error, text);
    const [pending, setPending] = useState(false);

    useEffect(() => setPending(false), [error]);
    useRetryOnReconnect(error?.kind === 'network', onRetry);

    const handleRetry = () => {
        setPending(true);
        onRetry?.();
    };

    const isRetrying = retrying || pending;

    return (
        <div
            className={[styles.status, compact ? styles.compact : '', className].filter(Boolean).join(' ')}
            role="alert"
        >
            <span className={styles.icon}><ErrorIcon /></span>
            <div className={styles.body}>
                <p className={styles.title}>{title}</p>
                {description && <p className={styles.description}>{description}</p>}
            </div>
            {(onRetry || action) && (
                <div className={styles.actions}>
                    {onRetry && (
                        <Button size={compact ? 'sm' : 'md'} onClick={handleRetry} disabled={isRetrying}>
                            {isRetrying ? STATUS_MESSAGES.common.retrying : STATUS_MESSAGES.common.retry}
                        </Button>
                    )}
                    {action}
                </div>
            )}
        </div>
    );
};
