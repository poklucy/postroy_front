import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { ProfilePageHeader } from '@/components/profile/ProfilePageHeader';
import { ProductList } from '@/components/product/ProductList';
import { getViewedProducts } from '@/utils/viewedProducts';

export const ViewedProductsPage: React.FC = () => {
    const [products] = useState(getViewedProducts);

    return (
        <div className="page">
            <Breadcrumbs />
            <ProfilePageHeader title="История просмотров" />
            <ProductList products={products} columns={4} emptyMessage="Вы ещё не просматривали товары" />
        </div>
    );
};
