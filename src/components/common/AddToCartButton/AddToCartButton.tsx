import React from 'react';
import { Button } from '@/components/common/Button';
import { BagIcon } from '@/components/common/icons';
import { QuantityControls } from '@/components/common/QuantityControls';
import styles from './AddToCartButton.module.css';

interface AddToCartButtonProps {
    inStock: boolean;
    isInCart: boolean;
    quantity: number;
    onAddToCart: () => void;
    onQuantityChange: (value: number) => void;
    maxQuantity: number;
    showGoToCart?: boolean;
}

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({
                                                                    inStock,
                                                                    isInCart,
                                                                    quantity,
                                                                    onAddToCart,
                                                                    onQuantityChange,
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

    if (!isInCart) {
        return (
            <Button onClick={onAddToCart} icon={<BagIcon />} fullWidth>
                В корзину
            </Button>
        );
    }

    return (
        <QuantityControls
            value={quantity}
            min={0}
            max={maxQuantity}
            onChange={onQuantityChange}
            showGoToCart={showGoToCart}
        />
    );
};
