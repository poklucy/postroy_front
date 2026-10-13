import React, { useId, useRef, useState } from 'react';
import { ChevronIcon } from '@/components/common/icons';
import { useClickOutside } from '@/hooks/useClickOutside';
import styles from './Dropdown.module.css';

export interface DropdownOption<T extends string> {
    value: T;
    label: string;
}

interface DropdownProps<T extends string> {
    options: DropdownOption<T>[];
    value: T | '';
    onChange: (value: T) => void;
    icon?: React.ReactNode;
    placeholder?: string;
    ariaLabel?: string;
    size?: 'sm' | 'md';
    fullWidth?: boolean;
    error?: boolean;
    className?: string;
}

export const Dropdown = <T extends string>({
                                               options,
                                               value,
                                               onChange,
                                               icon,
                                               placeholder = 'Выберите',
                                               ariaLabel,
                                               size = 'sm',
                                               fullWidth = false,
                                               error = false,
                                               className,
                                           }: DropdownProps<T>) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const listId = useId();
    const current = options.find(option => option.value === value);

    useClickOutside(rootRef, () => setOpen(false), open);

    const handleSelect = (next: T) => {
        onChange(next);
        setOpen(false);
    };

    return (
        <div
            ref={rootRef}
            className={[styles.root, fullWidth ? styles.fullWidth : '', className].filter(Boolean).join(' ')}
        >
            <button
                type="button"
                className={[
                    styles.trigger,
                    styles[size],
                    open ? styles.triggerOpen : '',
                    error ? styles.triggerError : '',
                ].filter(Boolean).join(' ')}
                onClick={() => setOpen(prev => !prev)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls={listId}
                aria-label={ariaLabel}
            >
                {icon && <span className={styles.icon}>{icon}</span>}
                <span className={`${styles.label} ${current ? '' : styles.placeholder}`}>
                    {current ? current.label : placeholder}
                </span>
                <ChevronIcon className={styles.chevron} />
            </button>

            {open && (
                <ul id={listId} className={styles.menu} role="listbox">
                    {options.map(option => (
                        <li key={option.value}>
                            <button
                                type="button"
                                role="option"
                                aria-selected={option.value === value}
                                className={`${styles.option} ${option.value === value ? styles.optionActive : ''}`}
                                onClick={() => handleSelect(option.value)}
                            >
                                {option.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
