import { useState, useCallback } from 'react';

interface UseQuantityCounterProps {
    initialQuantity?: number;
    minQuantity?: number;
    maxQuantity?: number;
    onQuantityChange?: (quantity: number) => void;
}

export const useQuantityCounter = ({
                                       initialQuantity = 1,
                                       minQuantity = 0,
                                       maxQuantity = 99,
                                       onQuantityChange,
                                   }: UseQuantityCounterProps = {}) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const increment = useCallback(() => {
        setQuantity((prev) => {
            const newQuantity = Math.min(prev + 1, maxQuantity);
            onQuantityChange?.(newQuantity);
            return newQuantity;
        });
    }, [maxQuantity, onQuantityChange]);

    const decrement = useCallback(() => {
        setQuantity((prev) => {
            const newQuantity = Math.max(prev - 1, minQuantity);
            onQuantityChange?.(newQuantity);
            return newQuantity;
        });
    }, [minQuantity, onQuantityChange]);

    const setQuantityValue = useCallback((value: number) => {
        const clampedValue = Math.min(Math.max(value, minQuantity), maxQuantity);
        setQuantity(clampedValue);
        onQuantityChange?.(clampedValue);
    }, [minQuantity, maxQuantity, onQuantityChange]);

    const reset = useCallback(() => {
        setQuantity(initialQuantity);
        onQuantityChange?.(initialQuantity);
    }, [initialQuantity, onQuantityChange]);

    return {
        quantity,
        increment,
        decrement,
        setQuantity: setQuantityValue,
        reset,
    };
};
