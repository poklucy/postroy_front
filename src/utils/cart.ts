import { Product, ProductCard } from '@/types/product.types';
import { CartItem } from '@/store/slices/cart/cart.slice';

const getSlugs = (product: Product | ProductCard) => {
    const { category, subcategory, group } = product as Partial<Product>;
    const { categorySlug, subcategorySlug, groupSlug } = product as Partial<ProductCard>;
    return {
        categorySlug: category?.slug ?? categorySlug,
        subcategorySlug: subcategory?.slug ?? subcategorySlug,
        groupSlug: group?.slug ?? groupSlug,
    };
};

export const toCartItem = (
    product: Product | ProductCard,
    quantity: number = 1
): CartItem => ({
    productId: String(product.id),
    article: product.article,
    name: product.name,
    price: product.price,
    image: product.mainImage,
    quantity,
    inStock: product.inStock,
    slug: product.slug,
    ...getSlugs(product),
});
