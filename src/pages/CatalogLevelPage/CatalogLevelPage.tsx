import React from 'react';
import { Navigate } from 'react-router-dom';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { EntityHeader } from '@/components/catalog/EntityHeader';
import { EntityGrid, EntityGridItem } from '@/components/catalog/EntityGrid';
import { CatalogListing } from '@/components/catalog/CatalogListing';
import { CatalogLevelSkeleton } from '@/components/catalog/CatalogSkeleton';
import { StatusMessage } from '@/components/common/StatusMessage';
import { buildGroupUrl, buildSubcategoryUrl } from '@/config/routes.config';
import { STATUS_MESSAGES } from '@/config/statusMessages';
import { useCatalogContext } from '@/hooks/useCatalogContext';
import { NotFoundPage } from '@/pages/NotFoundPage';
import styles from './CatalogLevelPage.module.css';

interface LevelView {
    title: string;
    description?: string;
    grid?: {
        items: EntityGridItem[];
        buildUrl: (item: EntityGridItem) => string;
        title?: string;
        emptyMessage: string;
    };
    emptyMessage: string;
}

export const CatalogLevelPage: React.FC = () => {
    const {
        level,
        hierarchy,
        hierarchyReady,
        currentSubcategory,
        currentGroup,
        products,
        productsLoading,
        productsError,
        retryProducts,
        hierarchyError,
        retryHierarchy,
        notFound,
    } = useCatalogContext();

    if (notFound) {
        return <NotFoundPage {...STATUS_MESSAGES.category.notFound} />;
    }

    if (hierarchyError) {
        return (
            <div className="page">
                <Breadcrumbs/>
                <StatusMessage
                    className={styles.status}
                    error={hierarchyError}
                    text={STATUS_MESSAGES.category.error}
                    onRetry={retryHierarchy}
                />
            </div>
        );
    }

    if (!hierarchyReady || !hierarchy) {
        return <CatalogLevelSkeleton />;
    }

    if (level === 'category' && hierarchy.subcategories.length === 1) {
        return <Navigate to={buildSubcategoryUrl(hierarchy.slug, hierarchy.subcategories[0].slug)} replace />;
    }

    let view: LevelView;

    if (level === 'category') {
        view = {
            title: hierarchy.name,
            description: hierarchy.description,
            grid: {
                items: hierarchy.subcategories,
                buildUrl: item => buildSubcategoryUrl(hierarchy.slug, item.slug),
                emptyMessage: 'В этой категории пока нет подкатегорий',
            },
            emptyMessage: STATUS_MESSAGES.products.empty.category.title,
        };
    } else if (level === 'subcategory') {
        if (!currentSubcategory) return <CatalogLevelSkeleton />;
        view = {
            title: currentSubcategory.name,
            description: currentSubcategory.description,
            grid: {
                items: currentSubcategory.groups ?? [],
                buildUrl: item => buildGroupUrl(hierarchy.slug, currentSubcategory.slug, item.slug),
                title: 'Группы товаров',
                emptyMessage: 'В этой подкатегории пока нет групп',
            },
            emptyMessage: STATUS_MESSAGES.products.empty.subcategory.title,
        };
    } else {
        if (!currentGroup) return <CatalogLevelSkeleton />;
        view = {
            title: currentGroup.name,
            description: currentGroup.description,
            emptyMessage: STATUS_MESSAGES.products.empty.group.title,
        };
    }

    return (
        <div className="page">
            <Breadcrumbs/>
            <EntityHeader title={view.title} description={view.description} count={products.length} />
            {view.grid && <EntityGrid {...view.grid} />}
            <CatalogListing
                products={products}
                loading={productsLoading}
                error={productsError}
                onRetry={retryProducts}
                emptyMessage={view.emptyMessage}
            />
        </div>
    );
};
