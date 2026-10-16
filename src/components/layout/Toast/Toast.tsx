import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { hideToast, selectToast } from '@/store/slices/notifications';
import styles from './Toast.module.css';

const VISIBLE_MS = 4000;

export const Toast: React.FC = () => {
    const dispatch = useAppDispatch();
    const toast = useAppSelector(selectToast);

    useEffect(() => {
        if (!toast) return;
        const timer = setTimeout(() => dispatch(hideToast(toast.id)), VISIBLE_MS);
        return () => clearTimeout(timer);
    }, [toast, dispatch]);

    if (!toast) return null;

    const close = () => dispatch(hideToast(toast.id));

    return (
        <div key={toast.id} className={[styles.toast, toast.tone === 'warning' ? styles.warning : ''].filter(Boolean).join(' ')} role="status" aria-live="polite">
            <span className={styles.icon} aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                    <circle cx="13" cy="13" r="12" stroke="currentColor" strokeWidth="1.4" />
                    {toast.tone === 'success' ? (
                        <path d="M8 13.3L11.3 16.5L18 9.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    ) : (
                        <path d="M13 7.5V14M13 17.5V18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    )}
                </svg>
            </span>
            <div className={styles.body}>
                <p className={styles.message}>{toast.message}</p>
                {toast.link && (
                    <Link to={toast.link.to} className={styles.link} onClick={close}>
                        {toast.link.label}
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                            <path d="M0.67 8.74L0 8.06L6.78 1.28L0.88 0.88L1.76 0L8.35 0.37L8.74 6.96L7.86 7.84L7.46 1.95L0.67 8.74Z" fill="currentColor" />
                        </svg>
                    </Link>
                )}
            </div>
            <button type="button" className={styles.close} onClick={close} aria-label="Закрыть уведомление">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
            </button>
        </div>
    );
};
