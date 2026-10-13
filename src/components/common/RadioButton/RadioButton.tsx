import React from 'react';
import styles from './RadioButton.module.css';

interface RadioButtonProps {
    name: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
    label: React.ReactNode;
    className?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
                                                            name,
                                                            value,
                                                            checked,
                                                            onChange,
                                                            label,
                                                            className,
                                                        }) => (
    <label className={[styles.label, className].filter(Boolean).join(' ')}>
        <input
            type="radio"
            className={styles.input}
            name={name}
            value={value}
            checked={checked}
            onChange={() => onChange(value)}
        />
        <span className={styles.circle} aria-hidden="true" />
        <span>{label}</span>
    </label>
);
