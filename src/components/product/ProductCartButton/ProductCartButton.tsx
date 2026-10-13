import React from 'react';
import { AddToCartButton } from '@/components/common/AddToCartButton';
import { useCartProduct } from '@/hooks/useCartProduct';
import { Product, ProductCard } from '@/types/product.types';

interface ProductCartButtonProps {
    product: Product | ProductCard;
    showGoToCart?: boolean;
}

export const ProductCartButton: React.FC<ProductCartButtonProps> = ({ product, showGoToCart = true }) => {
    const cart = useCartProduct({ product });

    return (
        <AddToCartButton
            inStock={product.inStock}
            isInCart={cart.isInCart}
            quantity={cart.quantity}
            onAddToCart={cart.addToCart}
            onIncrement={cart.increment}
            onDecrement={cart.decrement}
            onQuantityChange={cart.setQuantity}
            minQuantity={cart.minQuantity}
            maxQuantity={cart.maxQuantity}
            showGoToCart={showGoToCart}
        />
    );
};
