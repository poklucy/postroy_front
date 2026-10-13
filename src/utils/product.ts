import { buildProductUrl } from '@/config/routes.config';
import { Product, ProductCard } from '@/types/product.types';

const getProductSlugs = (product: Product | ProductCard) => {
    if ('categorySlug' in product) {
        return {
            categorySlug: product.categorySlug || '',
            subcategorySlug: product.subcategorySlug || '',
            groupSlug: product.groupSlug || '',
        };
    }

    const { category, subcategory, group } = product as Product;
    return {
        categorySlug: category?.slug || '',
        subcategorySlug: subcategory?.slug || '',
        groupSlug: group?.slug || '',
    };
};

export const getProductUrl = (product: Product | ProductCard): string => {
    const { categorySlug, subcategorySlug, groupSlug } = getProductSlugs(product);

    if (categorySlug && subcategorySlug && groupSlug) {
        return buildProductUrl(categorySlug, subcategorySlug, groupSlug, product.slug);
    }
    if (categorySlug && groupSlug) {
        return buildProductUrl(categorySlug, groupSlug, groupSlug, product.slug);
    }
    return `/product/${product.slug}`;
};
