import React, { useCallback, useMemo, useState } from 'react';
import { FilterDrawer, FilterPanel, FilterSummary, useCatalogFilters } from '@/components/common/FilterPanel';
import { SortDropdown, SortValue } from '@/components/common/SortDropdown';
import { ViewMode, ViewSwitcher } from '@/components/common/ViewSwitcher';
import { ProductList } from '@/components/product/ProductList';
import { ProductCard } from '@/types/product.types';
import { RequestError } from '@/types/request.types';
import styles from './CatalogListing.module.css';

interface CatalogListingProps {
    products: ProductCard[];
    loading?: boolean;
    error?: RequestError | null;
    onRetry?: () => void;
    emptyMessage?: string;
}

const sortProducts = (products: ProductCard[], sort: SortValue): ProductCard[] => {
    switch (sort) {
        case 'price_asc':
            return [...products].sort((a, b) => a.price - b.price);
        case 'price_desc':
            return [...products].sort((a, b) => b.price - a.price);
        case 'newest':
            return [...products].sort((a, b) => Number(Boolean(b.isNew)) - Number(Boolean(a.isNew)));
        default:
            return products;
    }
};

const FiltersIcon: React.FC = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M4.87207 14.3594C6.42967 14.3595 7.69238 15.6221 7.69238 17.1797C7.69227 18.7372 6.4296 19.9999 4.87207 20C3.58102 20 2.49206 19.1321 2.15723 17.9482H0.769531C0.344764 17.9482 0.000108279 17.6044 0 17.1797C0 16.7549 0.344697 16.4102 0.769531 16.4102H2.15723C2.49207 15.2263 3.58103 14.3594 4.87207 14.3594Z"
            fill="#A4AFB7"/>
        <path
            d="M19.2305 16.4102C19.6553 16.4102 20 16.7549 20 17.1797C19.9999 17.6044 19.6552 17.9482 19.2305 17.9482H10C9.57523 17.9482 9.23058 17.6044 9.23047 17.1797C9.23047 16.7549 9.57517 16.4102 10 16.4102H19.2305Z"
            fill="#A4AFB7"/>
        <path
            d="M15.1279 7.17969C16.4189 7.17969 17.5079 8.04673 17.8428 9.23047H19.2305C19.6553 9.23047 20 9.57517 20 10C20 10.4248 19.6553 10.7695 19.2305 10.7695H17.8428C17.5079 11.9533 16.4189 12.8203 15.1279 12.8203C13.5703 12.8202 12.3076 11.5576 12.3076 10C12.3076 8.44237 13.5703 7.17984 15.1279 7.17969Z"
            fill="#A4AFB7"/>
        <path
            d="M10 9.23047C10.4248 9.23047 10.7695 9.57517 10.7695 10C10.7695 10.4248 10.4248 10.7695 10 10.7695H0.769531C0.344697 10.7695 6.4426e-08 10.4248 0 10C0 9.57517 0.344697 9.23047 0.769531 9.23047H10Z"
            fill="#A4AFB7"/>
        <path
            d="M10 0C11.2911 0 12.379 0.867909 12.7139 2.05176H19.2305C19.6552 2.05176 19.9999 2.39557 20 2.82031C20 3.24515 19.6553 3.58984 19.2305 3.58984H12.7139C12.379 4.77358 11.291 5.64062 10 5.64062C8.70903 5.64062 7.62104 4.77358 7.28613 3.58984H0.769531C0.344697 3.58984 0 3.24515 0 2.82031C0.00010815 2.39557 0.344764 2.05176 0.769531 2.05176H7.28613C7.62097 0.867909 8.70895 2.53636e-07 10 0Z"
            fill="#A4AFB7"/>
    </svg>

);

export const CatalogListing: React.FC<CatalogListingProps> = ({
                                                                  products,
                                                                  loading,
                                                                  error,
                                                                  onRetry,
                                                                  emptyMessage,
                                                              }) => {
    const filters = useCatalogFilters();
    const [viewMode, setViewMode] = useState<ViewMode>('grid');
    const [sort, setSort] = useState<SortValue>('popular');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const closeDrawer = useCallback(() => setDrawerOpen(false), []);
    const activeCount = filters.chips.length;
    const sortedProducts = useMemo(() => sortProducts(products, sort), [products, sort]);

    return (
        <div className={styles.catalog}>
            <FilterPanel className={styles.sidebar} filters={filters} totalCount={products.length}/>

            <div className={styles.content}>
                <div className={styles.toolbar}>
                    <SortDropdown value={sort} onChange={setSort}/>
                    <button type="button" className={styles.filtersButton} onClick={() => setDrawerOpen(true)}>
                        <span className={styles.filtersIcon}>
                            <FiltersIcon/>
                            {activeCount > 0 && <span className={styles.badge}>{activeCount}</span>}
                        </span>
                        Фильтры
                    </button>
                    <div className={styles.switcher}>
                        <ViewSwitcher value={viewMode} onChange={setViewMode} />
                    </div>
                </div>

                <FilterSummary className={styles.summary} filters={filters} totalCount={products.length} />

                <ProductList
                    products={sortedProducts}
                    columns={3}
                    loading={loading}
                    error={error}
                    onRetry={onRetry}
                    viewMode={viewMode}
                    emptyMessage={emptyMessage}
                />
            </div>

            <FilterDrawer
                filters={filters}
                totalCount={products.length}
                open={drawerOpen}
                onClose={closeDrawer}
            />
        </div>
    );
};
