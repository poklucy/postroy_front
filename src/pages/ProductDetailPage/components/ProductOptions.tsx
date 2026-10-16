import React, { useState } from 'react';
import styles from '../ProductDetailPage.module.css';

interface OptionGroupProps<T extends string | number> {
    label: string;
    options: { value: T; label: string }[];
    value: T;
    onChange: (value: T) => void;
}

const OptionGroup = <T extends string | number>({ label, options, value, onChange }: OptionGroupProps<T>) => (
    <div className={styles.optionGroup}>
        <div className={styles.optionLabel}>{label}</div>
        <div className={styles.optionValues}>
            {options.map(option => (
                <button
                    key={option.value}
                    className={`${styles.optionBtn} ${value === option.value ? styles.optionBtnActive : ''}`}
                    onClick={() => onChange(option.value)}
                    aria-pressed={value === option.value}
                >
                    {option.label}
                </button>
            ))}
        </div>
    </div>
);

const VOLUMES = [30, 50, 100].map(v => ({ value: v, label: String(v) }));

const COLORS = [
    { value: 'graphite', label: 'Графит' },
    { value: 'white', label: 'Белый' },
];

const SUPPLIES = [
    { value: 'bottom', label: 'Нижний' },
    { value: 'top', label: 'Верхний' },
];

export const ProductOptions: React.FC<{ className?: string }> = ({ className }) => {
    const [volume, setVolume] = useState(100);
    const [color, setColor] = useState('white');
    const [supply, setSupply] = useState('bottom');

    return (
        <div className={[styles.options, className].filter(Boolean).join(' ')}>
            <OptionGroup label="Объем, л" options={VOLUMES} value={volume} onChange={setVolume} />
            <OptionGroup label="Цвет" options={COLORS} value={color} onChange={setColor} />
            <OptionGroup label="Тип подводки" options={SUPPLIES} value={supply} onChange={setSupply} />
        </div>
    );
};
