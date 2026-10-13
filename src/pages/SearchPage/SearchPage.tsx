import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    mapToProductCard,
    searchProducts,
    selectProductsLoading,
    selectSearchResults,
} from '@/store/slices/products';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyMessage } from '@/components/common/EmptyMessage';
import { ProductList } from '@/components/product/ProductList';

export const SearchPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q')?.trim() ?? '';
    const results = useAppSelector(selectSearchResults);
    const isLoading = useAppSelector(selectProductsLoading);
    const products = useMemo(() => results.map(mapToProductCard), [results]);

    useEffect(() => {
        if (query) dispatch(searchProducts(query));
    }, [query, dispatch]);

    return (
        <div className="page">
            <Breadcrumbs />
            <h1>{query ? `Результаты поиска «${query}»` : 'Поиск'}</h1>

            {!query ? (
                <EmptyMessage>Введите название или артикул товара в строке поиска</EmptyMessage>
            ) : !isLoading && products.length === 0 ? (
                <EmptyMessage>По запросу «{query}» ничего не найдено</EmptyMessage>
            ) : (
                <ProductList products={products} columns={4} loading={isLoading} />
            )}
        </div>
    );
};
