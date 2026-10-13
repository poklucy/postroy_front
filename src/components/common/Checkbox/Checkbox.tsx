import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    disabled?: boolean;
    className?: string;
    size?: 'sm' | 'md';
}

export const Checkbox: React.FC<CheckboxProps> = ({
                                                      checked,
                                                      onChange,
                                                      label,
                                                      disabled = false,
                                                      className,
                                                      size = 'md',
                                                  }) => {
    return (
        <label
            className={[
                styles.label,
                styles[size],
                disabled ? styles.disabled : '',
                className || '',
            ]
                .filter(Boolean)
                .join(' ')}
        >
            <input
                type="checkbox"
                className={styles.input}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
            />
            <span className={styles.box} aria-hidden="true">
        <svg
            className={styles.icon}
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M1 5.8L3.5594 8.25702C3.97775 8.65864 4.64889 8.62133 5.02015 8.17582L11 1"
              stroke="#FF6900"
              strokeWidth="2"
              strokeLinecap="round"
          />
        </svg>
      </span>
            {label && <span className={styles.labelText}>{label}</span>}
        </label>
    );
};
