import React, { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
    mapToProductCard,
    searchProducts,
    selectSearchRequest,
    selectSearchResults,
} from '@/store/slices/products';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EmptyMessage } from '@/components/common/EmptyMessage';
import { ProductList } from '@/components/product/ProductList';
import { STATUS_MESSAGES } from '@/config/statusMessages';

export const SearchPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q')?.trim() ?? '';
    const results = useAppSelector(selectSearchResults);
    const request = useAppSelector(selectSearchRequest);
    const products = useMemo(() => results.map(mapToProductCard), [results]);

    const runSearch = useCallback(() => {
        if (query) dispatch(searchProducts(query));
    }, [query, dispatch]);

    useEffect(runSearch, [runSearch]);

    const isCurrent = request.query === query;
    const isLoading = !isCurrent || request.status === 'loading' || request.status === 'idle';
    const error = isCurrent && request.status === 'failed' ? request.error : null;
    const empty = STATUS_MESSAGES.search.empty(query);

    return (
        <div className="page">
            <Breadcrumbs />
            <h1>{query ? `Результаты поиска «${query}»` : 'Поиск'}</h1>

            {!query ? (
                <EmptyMessage>{STATUS_MESSAGES.search.idle.title}</EmptyMessage>
            ) : !isLoading && !error && products.length === 0 ? (
                <EmptyMessage>
                    {empty.title}. {empty.description}
                </EmptyMessage>
            ) : (
                <ProductList
                    products={products}
                    columns={4}
                    loading={isLoading}
                    error={error}
                    errorText={STATUS_MESSAGES.search.error}
                    onRetry={runSearch}
                />
            )}
        </div>
    );
};
