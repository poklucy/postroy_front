import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, updateQuantity, removeFromCart, selectCartItems } from '@/store/slices/cart';
import { useQuantityCounter } from './useQuantityCounter';
import { useEffect } from 'react';
import { Product, ProductCard } from '@/types/product.types';
import { toCartItem } from '@/utils/cart';

interface UseCartProductProps {
    product: Product | ProductCard;
    minQuantity?: number;
    maxQuantity?: number;
}

export const useCartProduct = ({
                                   product,
                                   minQuantity = 1,
                                   maxQuantity = 99,
                               }: UseCartProductProps) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);

    const productId = String(product.id);

    const cartItem = cartItems.find(item => item.productId === productId);
    const quantityInCart = cartItem?.quantity || 0;
    const isInCart = quantityInCart > 0;

    const {
        quantity,
        increment,
        decrement,
        setQuantity,
        reset,
    } = useQuantityCounter({
        initialQuantity: quantityInCart || minQuantity,
        minQuantity: 0,
        maxQuantity,
    });

    useEffect(() => {
        if (isInCart) {
            setQuantity(quantityInCart);
        } else {
            reset();
        }
    }, [quantityInCart, isInCart, setQuantity, reset]);

    const handleAddToCart = () => {
        dispatch(addToCart(toCartItem(product, quantity || minQuantity)));
    };

    const handleUpdateQuantity = (newQuantity: number) => {
        if (newQuantity <= 0) {
            dispatch(removeFromCart(productId));
        } else {
            dispatch(updateQuantity({
                productId,
                quantity: newQuantity,
            }));
        }
    };

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        increment();
        handleUpdateQuantity(newQuantity);
    };

    const handleDecrement = () => {
        const newQuantity = quantity - 1;
        decrement();
        handleUpdateQuantity(newQuantity);
    };

    const handleQuantityInput = (value: number) => {
        const clampedValue = Math.min(Math.max(value, 0), maxQuantity);
        setQuantity(clampedValue);
        handleUpdateQuantity(clampedValue);
    };

    return {
        quantity,
        isInCart,
        quantityInCart,

        addToCart: handleAddToCart,
        increment: handleIncrement,
        decrement: handleDecrement,
        setQuantity: handleQuantityInput,
        reset,

        minQuantity: 0,
        maxQuantity,
    };
};
