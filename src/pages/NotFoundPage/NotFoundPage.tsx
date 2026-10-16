import React from 'react';
import { Button } from '@/components/common/Button';
import { ErrorState } from '@/components/common/ErrorState';
import { ROUTES } from '@/config/routes.config';
import { STATUS_MESSAGES } from '@/config/statusMessages';
import { usePageMeta } from '@/hooks/usePageMeta';

interface NotFoundPageProps {
    title?: string;
    description?: React.ReactNode;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
                                                              title = STATUS_MESSAGES.pages.notFound.title,
                                                              description = STATUS_MESSAGES.pages.notFound.description,
                                                          }) => {
    usePageMeta({ title: 'Страница не найдена', noindex: true });

    return (
        <ErrorState
            code="404"
            title={title}
            description={description}
            actions={
                <>
                    <Button to={ROUTES.HOME}>{STATUS_MESSAGES.common.toHome}</Button>
                    <Button to={ROUTES.CATALOG} variant="outline">{STATUS_MESSAGES.common.toCatalog}</Button>
                </>
            }
        >
            {/*<form className={styles.search} onSubmit={handleSearch} role="search">*/}
            {/*    <Input*/}
            {/*        value={query}*/}
            {/*        onChange={(e) => setQuery(e.target.value)}*/}
            {/*        placeholder="Название или артикул товара"*/}
            {/*        aria-label="Поиск по сайту"*/}
            {/*    />*/}
            {/*    <Button type="submit" variant="yellow">Найти</Button>*/}
            {/*</form>*/}

            {/*{categories.length > 0 && (*/}
            {/*    <nav className={styles.categories} aria-label="Популярные категории">*/}
            {/*        <span className={styles.categoriesTitle}>Популярные категории</span>*/}
            {/*        <ul className={styles.categoryList}>*/}
            {/*            {categories.map(category => (*/}
            {/*                <li key={category.id}>*/}
            {/*                    <Link to={buildCategoryUrl(category.slug)} className={styles.category}>*/}
            {/*                        {category.name}*/}
            {/*                    </Link>*/}
            {/*                </li>*/}
            {/*            ))}*/}
            {/*        </ul>*/}
            {/*    </nav>*/}
            {/*)}*/}
        </ErrorState>
    );
};
