import React from 'react';
import styles from './Switch.module.css';

interface SwitchProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    children?: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, children, disabled = false, className }) => (
    <label className={[styles.switch, disabled ? styles.disabled : '', className].filter(Boolean).join(' ')}>
        <input
            type="checkbox"
            role="switch"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onChange(e.target.checked)}
        />
        <span className={styles.track}><span className={styles.thumb} /></span>
        {children && <span className={styles.label}>{children}</span>}
    </label>
);
