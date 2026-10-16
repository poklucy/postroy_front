import React, { useEffect, useId, useRef } from 'react';
import { Button } from '@/components/common/Button';
import styles from './ConfirmDialog.module.css';

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
                                                                open,
                                                                title,
                                                                description,
                                                                confirmText = 'Да',
                                                                cancelText = 'Отмена',
                                                                onConfirm,
                                                                onCancel,
                                                            }) => {
    const titleId = useId();
    const cancelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        cancelRef.current?.querySelector('button')?.focus();
        const { overflow } = document.body.style;
        document.body.style.overflow = 'hidden';
        const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onCancel();
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = overflow;
            window.removeEventListener('keydown', handleKey);
        };
    }, [open, onCancel]);

    if (!open) return null;

    return (
        <div className={styles.overlay} onClick={e => e.target === e.currentTarget && onCancel()}>
            <div className={styles.dialog} role="alertdialog" aria-modal="true" aria-labelledby={titleId}>
                <p id={titleId} className={styles.title}>{title}</p>
                {description && <p className={styles.description}>{description}</p>}
                <div className={styles.actions}>
                    <Button onClick={onConfirm}>{confirmText}</Button>
                    <div ref={cancelRef} className={styles.cancel}>
                        <Button variant="outline" onClick={onCancel}>{cancelText}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
