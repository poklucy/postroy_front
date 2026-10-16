import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart, removeFromCart, selectCartItems, updateQuantity } from '@/store/slices/cart';
import { Product, ProductCard } from '@/types/product.types';
import { getMaxQuantity, toCartItem } from '@/utils/cart';

export const useCartProduct = ({ product }: { product: Product | ProductCard }) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(selectCartItems);

    const productId = String(product.id);
    const quantity = cartItems.find(item => item.productId === productId)?.quantity ?? 0;
    const maxQuantity = getMaxQuantity(product);

    const setQuantity = (value: number) => {
        const next = Math.min(Math.max(value, 0), maxQuantity);
        if (next === 0) {
            dispatch(removeFromCart(productId));
        } else {
            dispatch(updateQuantity({ productId, quantity: next }));
        }
    };

    return {
        quantity,
        isInCart: quantity > 0,
        maxQuantity,
        addToCart: () => dispatch(addToCart(toCartItem(product, 1))),
        setQuantity,
    };
};
