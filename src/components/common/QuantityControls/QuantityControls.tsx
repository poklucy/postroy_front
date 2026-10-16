import React, { useEffect, useState } from 'react';
import { Button } from '@/components/common/Button';
import { ROUTES } from '@/config/routes.config';
import styles from './QuantityControls.module.css';

interface QuantityControlsProps {
    value: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
    showGoToCart?: boolean;
    className?: string;
    disabled?: boolean;
}

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export const QuantityControls: React.FC<QuantityControlsProps> = ({
                                                                      value,
                                                                      min = 1,
                                                                      max = 99,
                                                                      onChange,
                                                                      showGoToCart = false,
                                                                      className,
                                                                      disabled = false,
                                                                  }) => {
    const [draft, setDraft] = useState(String(value));

    useEffect(() => setDraft(String(value)), [value]);

    const canDecrement = value > min;
    const canIncrement = value < max;

    const commitDraft = () => {
        const next = Number(draft);
        if (draft.trim() === '' || Number.isNaN(next)) {
            setDraft(String(value));
            return;
        }
        const clamped = clamp(Math.round(next), Math.max(min, 1), max);
        setDraft(String(clamped));
        if (clamped !== value) onChange(clamped);
    };

    return (
        <div className={[styles.cartControls, className].filter(Boolean).join(' ')}>
            <div className={styles.quantityControls}>
                <button
                    type="button"
                    className={styles.quantityBtn}
                    onClick={() => canDecrement && onChange(value - 1)}
                    disabled={!canDecrement || disabled}
                    aria-label="Уменьшить количество"
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button>

                <input
                    type="number"
                    inputMode="numeric"
                    className={styles.quantityInput}
                    value={draft}
                    min={Math.max(min, 1)}
                    max={max}
                    disabled={disabled}
                    onChange={(e) => setDraft(e.target.value)}
                    onBlur={commitDraft}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') e.currentTarget.blur();
                    }}
                    aria-label="Количество"
                />

                <button
                    type="button"
                    className={styles.quantityBtn}
                    onClick={() => canIncrement && onChange(value + 1)}
                    disabled={!canIncrement || disabled}
                    aria-label="Увеличить количество"
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                        <path d="M5 1V9M1 5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            {showGoToCart && (
                <Button to={ROUTES.CART} size="sm" className={styles.goToCart}>
                    Перейти в корзину
                </Button>
            )}
        </div>
    );
};
