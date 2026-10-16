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
            onQuantityChange={cart.setQuantity}
            maxQuantity={cart.maxQuantity}
            showGoToCart={showGoToCart}
        />
    );
};
