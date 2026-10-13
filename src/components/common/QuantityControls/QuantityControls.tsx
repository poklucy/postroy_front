import React from 'react';
import { Button } from '@/components/common/Button';
import { BagIcon } from '@/components/common/icons';
import styles from './QuantityControls.module.css';

interface QuantityControlsProps {
    value: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
    withAddButton?: boolean;
    onAddToCart?: () => void;
    showGoToCart?: boolean;
    goToCartHref?: string;
    className?: string;
    disabled?: boolean;
}

export const QuantityControls: React.FC<QuantityControlsProps> = ({
                                                                      value,
                                                                      min = 1,
                                                                      max = 99,
                                                                      onChange,
                                                                      withAddButton = false,
                                                                      onAddToCart,
                                                                      showGoToCart = false,
                                                                      goToCartHref = '/cart',
                                                                      className,
                                                                      disabled = false,
                                                                  }) => {
    if (withAddButton && value === 0) {
        return (
            <Button
                onClick={onAddToCart}
                disabled={disabled}
                className={className}
                icon={<BagIcon />}
                fullWidth
            >
                В корзину
            </Button>
        );
    }

    const canDecrement = value > min;
    const canIncrement = value < max;

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
                    className={styles.quantityInput}
                    value={value}
                    min={min}
                    max={max}
                    disabled={disabled}
                    onChange={(e) => {
                        const next = Number(e.target.value);
                        if (Number.isNaN(next)) return;
                        onChange(Math.max(min, Math.min(max, next)));
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
                <Button to={goToCartHref} size="sm" className={styles.goToCart}>
                    Перейти в корзину
                </Button>
            )}
        </div>
    );
};
