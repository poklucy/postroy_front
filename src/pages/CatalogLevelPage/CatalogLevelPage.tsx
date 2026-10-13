import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EntityHeader } from '@/components/catalog/EntityHeader';
import { EntityGrid } from '@/components/catalog/EntityGrid';
import { ProductList } from '@/components/product/ProductList';
import {
    buildSubcategoryUrl,
    buildGroupUrl,
} from '@/config/routes.config';
import { useCatalogContext } from '@/hooks/useCatalogContext';
import { ViewSwitcher, ViewMode } from '@/components/common/ViewSwitcher';
import styles from './CatalogLevelPage.module.css';
import { FilterPanel } from '@/components/common/FilterPanel';
import { SortDropdown, SortValue } from '@/components/common/SortDropdown';

export const CatalogLevelPage: React.FC = () => {
    const {
        level,
        hierarchy,
        hierarchyReady,
        hierarchyLoading,
        currentSubcategory,
        currentGroup,
        products,
        productsLoading,
    } = useCatalogContext();

    const [viewMode, setViewMode] = useState<ViewMode>('grid');

    const [sort, setSort] = useState<SortValue>('popular');

    if (!hierarchyReady) {
        if (hierarchyLoading) {
            return <div className={styles.loading}>Загрузка...</div>;
        }
        return <div className={styles.notFound}>Категория не найдена</div>;
    }

    if (level === 'category') {
        if (hierarchy!.subcategories.length === 1) {
            const only = hierarchy!.subcategories[0];
            return (
                <Navigate
                    to={buildSubcategoryUrl(hierarchy!.slug, only.slug)}
                    replace
                />
            );
        }

        return (
            <div className="page">
                <Breadcrumbs/>
                <EntityHeader
                    title={hierarchy!.name}
                    description={hierarchy!.description}
                    count={products.length}
                />
                <EntityGrid
                    items={hierarchy!.subcategories}
                    buildUrl={item => buildSubcategoryUrl(hierarchy!.slug, item.slug)}
                    emptyMessage="В этой категории пока нет подкатегорий"
                />
                <div className={styles.catalog}>
                    <FilterPanel totalCount={products.length} />
                    <div className={styles.catalogContainer}>
                        <div className={styles.toolbar}>
                            <SortDropdown value={sort} onChange={setSort} />
                            <ViewSwitcher value={viewMode} onChange={setViewMode}/>
                        </div>
                        <ProductList
                            products={products}
                            columns={3}
                            loading={productsLoading}
                            emptyMessage="В этой категории пока нет товаров"
                            viewMode={viewMode}
                        />
                    </div>
                </div>
            </div>
        );
    }

    if (level === 'subcategory') {
        if (!currentSubcategory) {
            return <div className={styles.notFound}>Подкатегория не найдена</div>;
        }

        return (
            <div className="page">
                <Breadcrumbs/>
                <EntityHeader
                    title={currentSubcategory.name}
                    description={currentSubcategory.description}
                    count={products.length}
                />
                <EntityGrid
                    items={currentSubcategory.groups ?? []}
                    buildUrl={item =>
                        buildGroupUrl(hierarchy!.slug, currentSubcategory.slug, item.slug)
                    }
                    title="Группы товаров"
                    emptyMessage="В этой подкатегории пока нет групп"
                />
                <div className={styles.catalog}>
                    <FilterPanel totalCount={products.length}/>
                    <div className={styles.catalogContainer}>
                        <div className={styles.toolbar}>
                            <SortDropdown value={sort} onChange={setSort} />
                            <ViewSwitcher value={viewMode} onChange={setViewMode}/>
                        </div>
                        <ProductList
                            products={products}
                            columns={3}
                            loading={productsLoading}
                            viewMode={viewMode}
                            emptyMessage="В этой подкатегории пока нет товаров"
                        />
                    </div>
                </div>
            </div>
        );
    }

    if (!currentGroup) {
        return <div className={styles.notFound}>Группа не найдена</div>;
    }

    return (
        <div className="page">
            <Breadcrumbs/>
            <EntityHeader
                title={currentGroup.name}
                description={currentGroup.description}
                count={products.length}
            />
            <div className={styles.catalog}>
                <FilterPanel totalCount={products.length}/>
                <div className={styles.catalogContainer}>
                    <div className={styles.toolbar}>
                        <SortDropdown value={sort} onChange={setSort} />
                        <ViewSwitcher value={viewMode} onChange={setViewMode}/>
                    </div>
                    <ProductList
                        products={products}
                        columns={3}
                        loading={productsLoading}
                        viewMode={viewMode}
                        emptyMessage="В этой группе пока нет товаров"
                    />
                </div>
            </div>
        </div>
    );
};
