import React from 'react';
import styles from './ProductActionButton.module.css';

export interface ProductActionButtonProps {
    active: boolean;
    onToggle: () => void;
    icon: React.ReactNode;
    ariaLabel: string;
    label?: React.ReactNode;
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export const ProductActionButton: React.FC<ProductActionButtonProps> = ({
                                                                            active,
                                                                            onToggle,
                                                                            icon,
                                                                            ariaLabel,
                                                                            label,
                                                                            size = 'medium',
                                                                            className,
                                                                        }) => {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
    };

    return (
        <button
            type="button"
            className={[
                styles.button,
                styles[size],
                label ? styles.withLabel : '',
                active ? styles.active : '',
                className,
            ].filter(Boolean).join(' ')}
            onClick={handleClick}
            aria-label={label ? undefined : ariaLabel}
            aria-pressed={active}
            title={ariaLabel}
        >
            <span className={styles.icon}>{icon}</span>
            {label && <span className={styles.label}>{label}</span>}
        </button>
    );
};
