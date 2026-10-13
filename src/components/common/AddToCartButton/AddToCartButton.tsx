import React from 'react';
import { QuantityControls } from '@/components/common/QuantityControls';
import styles from './AddToCartButton.module.css';

interface AddToCartButtonProps {
    inStock: boolean;
    isInCart: boolean;
    quantity: number;
    onAddToCart: () => void;
    onIncrement: () => void;
    onDecrement: () => void;
    onQuantityChange: (value: number) => void;
    minQuantity: number;
    maxQuantity: number;
    showGoToCart?: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
                                                                    inStock,
                                                                    isInCart,
                                                                    quantity,
                                                                    onAddToCart,
                                                                    onIncrement,
                                                                    onDecrement,
                                                                    onQuantityChange,
                                                                    minQuantity,
                                                                    maxQuantity,
                                                                    showGoToCart = true,
                                                                }) => {
    if (!inStock) {
        return (
            <button className={styles.noStock} disabled type="button">
                Нет в наличии
            </button>
        );
    }

    if (isInCart) {
        return (
            <QuantityControls
                value={quantity}
                min={minQuantity}
                max={maxQuantity}
                onChange={(next) => {
                    if (next > quantity) onIncrement();
                    else if (next < quantity) onDecrement();
                    onQuantityChange(next);
                }}
                showGoToCart={showGoToCart}
            />
        );
    }

    return (
        <QuantityControls
            value={0}
            min={minQuantity}
            max={maxQuantity}
            onChange={onQuantityChange}
            withAddButton
            onAddToCart={onAddToCart}
        />
    );
};
