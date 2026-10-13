import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ProductList } from '@/components/product/ProductList';
import { getViewedProducts } from '@/utils/viewedProducts';

export const ViewedProductsPage: React.FC = () => {
    const [products] = useState(getViewedProducts);

    return (
        <div className="page">
            <Breadcrumbs />
            <h1>История просмотров</h1>
            <ProductList products={products} columns={4} emptyMessage="Вы ещё не просматривали товары" />
        </div>
    );
};
